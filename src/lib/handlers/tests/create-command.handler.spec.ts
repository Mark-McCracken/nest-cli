import {CreateCommandHandler} from '../create-command.handler';
import {CommandHandler} from '../../../common/program/interfaces/command.handler.interface';
import * as sinon from 'sinon';
import {GitRepository} from '../../../core/project/repositories/git.repository';
import {FileSystemUtils} from '../../../core/utils/file-system.utils';
import {CreateProjectProcessor} from '../../../core/project/processors/create-project.processor';
import {LoggerService} from '../../../core/logger/logger.service';

describe('CreateCommandHandler', () => {
  let sandbox: sinon.SinonSandbox;
  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  let handler: CommandHandler;
  beforeEach(() => {
    handler = new CreateCommandHandler();
  });

  let cloneStub: sinon.SinonStub;
  let processStub: sinon.SinonStub;
  beforeEach(() => {
    cloneStub = sandbox.stub(GitRepository.prototype, 'clone').callsFake(() => Promise.resolve());
    sandbox.stub(FileSystemUtils, 'readdir').callsFake(() => Promise.resolve([]));
    processStub = sandbox.stub(CreateProjectProcessor.prototype, 'process').callsFake(() => Promise.resolve());
  });

  describe('#execute()', () => {
    it.skip('should clone the project repository to destination', () => {
      return handler.execute({ name: 'application', destination: 'path/to/application' }, {}, console)
        .then(() => {
          sinon.assert.calledOnce(cloneStub);
        });
    });

    it('should process with the create project processor', () => {
      return handler.execute({ name: 'application', destination: 'path/to/application' }, {}, console)
        .then(() => {
          sinon.assert.calledOnce(processStub);
        });
    });
  });
});
