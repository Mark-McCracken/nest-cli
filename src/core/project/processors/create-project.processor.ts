import {Processor} from '../../../common/asset/interfaces/processor.interface';
import {Project} from '../../../common/project/interfaces/project.interface';
import {GitRepository} from '../repositories/git.repository';
import {Logger} from '../../../common/logger/interfaces/logger.interface';
import {LoggerService} from '../../logger/logger.service';
import {ColorService} from '../../logger/color.service';
import * as path from 'path';
import {FileSystemUtils} from '../../utils/file-system.utils';
import {Prompt} from '../../../common/prompt/interfaces/prompt.interface';
import {NestCliPrompt} from '../../prompt/nest-cli.prompt';
import {Repository} from '../../../common/project/interfaces/repository.interface';
import {Schema} from '../../../common/prompt/interfaces/schema.interface';
import {SchemaBuilder} from '../../prompt/builders/schema.builder';
import {PropertyBuilder} from '../../prompt/builders/property.builder';
import {PropertyType} from '../../../common/prompt/enums/property-type.enum';

export class CreateProjectProcessor implements Processor {
  private _logger: Logger = LoggerService.getLogger();
  private _prompt: Prompt;
  private _repository: Repository;

  constructor(private _project: Project) {
    this._prompt = new NestCliPrompt();
    this._repository = new GitRepository(this._project.source.value, this._project.destination.path);
  }

  public process(): Promise<void> {
    return this._prompt.start(this.buildSchema())
      .then(() => this._repository.clone())
      .then(() => FileSystemUtils.readdir(path.join(process.cwd(), this._project.destination.path)))
      .then(files => files.forEach(file => this._logger.info(ColorService.green('create'), file)));
  }

  private buildSchema(): Schema {
    return new SchemaBuilder()
      .addProperty('description',
        new PropertyBuilder()
          .addMessage('description')
          .addType(PropertyType.STRING)
          .addRequired(false)
          .build()
      )
      .addProperty('version',
        new PropertyBuilder()
          .addMessage('version')
          .addType(PropertyType.STRING)
          .addPattern(/[v0-9.]/)
          .addRequired(true)
          .build()
      )
      .build();
  }
}
