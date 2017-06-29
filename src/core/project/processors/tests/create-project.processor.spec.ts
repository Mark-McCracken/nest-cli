import {Processor} from '../../../../common/asset/interfaces/processor.interface';
import {CreateProjectProcessor} from '../create-project.processor';
import {Project} from '../../../../common/project/interfaces/project.interface';
import {SourceType} from '../../../../common/project/enums/source.type.enum';
import * as sinon from 'sinon';
import {GitRepository} from '../../repositories/git.repository';
import {LoggerService} from '../../../logger/logger.service';
import {FileSystemUtils} from '../../../utils/file-system.utils';
import {NestCliPrompt} from '../../../prompt/nest-cli.prompt';

describe('CreateProjectProcessor', () => {
  let sandbox: sinon.SinonSandbox;
  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  let cloneStub: sinon.SinonStub;
  let startStub: sinon.SinonStub;
  beforeEach(() => {
    cloneStub = sandbox.stub(GitRepository.prototype, 'clone').callsFake(() => Promise.resolve());
    startStub = sandbox.stub(NestCliPrompt.prototype, 'start').callsFake(() => Promise.resolve());
    sandbox.stub(LoggerService, 'getLogger').callsFake(() => {
      return {
        info: () => {},
        debug: () => {}
      };
    });
    sandbox.stub(FileSystemUtils, 'readdir').callsFake(() => Promise.resolve([]));
  });

  let processor: Processor;
  const project: Project = {
    destination: {
      name: 'name',
      path: 'name'
    },
    source: {
      type: SourceType.GIT,
      value: 'value'
    }
  };
  beforeEach(() => processor = new CreateProjectProcessor(project));

  describe('#process()', () => {
    it('should use the prompt to get project configuration from user inputs', () => {
      return processor.process()
        .then(() => {
          sinon.assert.calledOnce(startStub);
          sinon.assert.calledWith(startStub, {
            properties: {
              description: {
                message: 'description',
                type: 'string',
                required: false
              },
              version: {
                message: 'version',
                type: 'string',
                pattern: /[0-9.]/,
                required: true,
                default: '1.0.0'
              }
            }
          });
        });
    });

    it('should clone the source project into the name project', () => {
      return processor.process()
        .then(() => {
          sinon.assert.calledOnce(cloneStub);
        });
    });
  });
});
