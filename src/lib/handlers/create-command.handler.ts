import {CommandHandler} from '../../common/program/interfaces/command.handler.interface';
import {FileSystemUtils} from '../../core/utils/file-system.utils';
import * as path from 'path';
import {ColorService} from '../../core/logger/color.service';
import {CommandArguments} from '../../common/program/interfaces/command.aguments.interface';
import {CommandOptions} from '../../common/program/interfaces/command.options.interface';
import {Logger} from '../../common/logger/interfaces/logger.interface';
import {Repository} from '../../common/project/interfaces/repository.interface';
import {GitRepository} from '../../core/project/repositories/git.repository';
import {LoggerService} from '../../core/logger/logger.service';
import {CreateProjectProcessor} from '../../core/project/processors/create-project.processor';
import {SourceType} from '../../common/project/enums/source.type.enum';

export interface CreateCommandArguments extends CommandArguments {
  name: string
  destination?: string
}

export interface CreateCommandOptions extends CommandOptions {
  repository: string
}

export class CreateCommandHandler implements CommandHandler {
  private static DEFAULT_REPOSITORY: string = 'https://github.com/ThomRick/nest-typescript-starter.git';

  public execute(args: CreateCommandArguments, options: CreateCommandOptions, logger: Logger): Promise<void> {
    LoggerService.setLogger(logger);
    logger.debug(ColorService.blue('[DEBUG]'), 'launch new command');
    logger.debug(ColorService.blue('[DEBUG]'), 'arguments :', JSON.stringify(args, null, 2));
    logger.debug(ColorService.blue('[DEBUG]'), 'options   :', JSON.stringify(options, null, 2));
    const name: string = args.name;
    const destination: string = args.destination || name;
    const repository: string = options.repository || CreateCommandHandler.DEFAULT_REPOSITORY;
    return new CreateProjectProcessor({
      destination: {
        name: name,
        path: destination
      },
      source: {
        type: SourceType.GIT,
        value: repository
      }
    }).process();
  }
}
