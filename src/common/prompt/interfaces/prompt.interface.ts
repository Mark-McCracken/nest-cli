import {Result} from './result.interface';
import {Schema} from './schema.interface';

export interface Prompt {
  start(schema: Schema): Promise<Result>
}
