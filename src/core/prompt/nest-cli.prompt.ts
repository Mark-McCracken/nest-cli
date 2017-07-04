import {Prompt} from '../../common/prompt/interfaces/prompt.interface';
import {Schema} from '../../common/prompt/interfaces/schema.interface';
import * as promptjs from 'prompt';
import {Result} from '../../common/prompt/interfaces/result.interface';

export class NestCliPrompt implements Prompt {

  public start(schema: Schema): Promise<Result> {
    return new Promise<Result>((resolve, reject) => {
      promptjs.message = '';
      promptjs.start();
      promptjs.get(schema, (error, result) => {
        if (error)
          reject(error);
        else
          resolve(this.map(result));
      });
    });
  }

  private map(result: { [key: string]: string }): Result {
    return {
      properties: result
    };
  }

}
