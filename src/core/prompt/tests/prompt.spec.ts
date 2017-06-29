import {Prompt} from '../../../common/prompt/interfaces/prompt.interface';
import {NestCliPrompt} from '../nest-cli.prompt';
import {Schema} from '../../../common/prompt/interfaces/schema.interface';
import {Result} from '../../../common/prompt/interfaces/result.interface';
import * as sinon from 'sinon';
import * as promptjs from 'prompt';
import {expect} from 'chai';

describe('NestCliPrompt', () => {
  const schema: Schema = {
    properties: {
      name: {
        message: 'message',
        type: 'string',
        required: false
      }
    }
  };
  const result: Result = {
    properties: {
      name: 'message'
    }
  };

  let sandbox: sinon.SinonSandbox;
  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  let startStub: sinon.SinonStub;
  let getStub: sinon.SinonStub;
  beforeEach(() => {
    startStub = sandbox.stub(promptjs, 'start');
    getStub = sandbox.stub(promptjs, 'get').callsFake((schema, callback) => {
      const promptjsResult = {
        name: 'message'
      };
      callback(null, promptjsResult);
    });
  });

  let prompt: Prompt;
  beforeEach(() => prompt = new NestCliPrompt());

  describe('#start()', () => {
    it('should call prompt start()', () => {
      return prompt.start(schema)
        .then(() => {
          sinon.assert.calledOnce(startStub);
        });
    });

    it('should call prompt get with the schema', () => {
      return prompt.start(schema)
        .then(() => {
          sinon.assert.calledOnce(getStub);
        });
    });

    it('should return the prompt result', () => {
      return prompt.start(schema)
        .then(promptResult => {
          expect(promptResult).to.be.deep.equal(result);
        });
    });

    it('should return an error', () => {
      getStub.callsFake((schema, callback) => callback(new Error('error message'), null));
      return prompt.start(schema)
        .then(() => {
          throw new Error('should not be here');
        })
        .catch(error => {
          expect(error.message).to.be.equal('error message');
        });
    });
  });
});
