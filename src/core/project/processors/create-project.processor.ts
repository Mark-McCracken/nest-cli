import {Processor} from '../../../common/asset/interfaces/processor.interface';
import {Project} from '../../../common/project/interfaces/project.interface';
import {GitRepository} from '../repositories/git.repository';
import {Logger} from '../../../common/logger/interfaces/logger.interface';
import {LoggerService} from '../../logger/logger.service';
import {ColorService} from '../../logger/color.service';
import * as path from 'path';
import {FileSystemUtils} from '../../utils/file-system.utils';

export class CreateProjectProcessor implements Processor {
  private _logger: Logger = LoggerService.getLogger();

  constructor(private _project: Project) {}

  public process(): Promise<void> {
    return new GitRepository(this._project.source.value, this._project.name)
      .clone()
      .then(() => FileSystemUtils.readdir(path.join(process.cwd(), this._project.name)))
      .then(files => files.forEach(file => this._logger.info(ColorService.green('create'), file)));
  }
}
