import {LoggerService} from '../../core/logger/logger.service';
import {Logger} from '../logger/interfaces/logger.interface';
import {ColorService} from '../../core/logger/color.service';

export function Deprecated(ClassName: string): MethodDecorator {
  const logger: Logger = LoggerService.getLogger();
  return (target, value: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    logger.warn(ColorService.yellow('[DEPRECATED]'), `- ${ ClassName } - the method '${ value }' is deprecated and will be removed the next minor version`);
    return descriptor;
  }
}
