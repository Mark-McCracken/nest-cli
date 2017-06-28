import {Result} from './result.interface';

export interface Prompt {
  start(): Promise<Result>
}
