import {Processor} from '../../../../common/processor/interfaces/processor.interface';
import {MiddlewareProcessor} from '../middleware.processor';
import {ModuleFinderImpl} from '../../module-finders/module.finder';
import {AssetGenerator} from '../../generators/asset.generator';
import * as sinon from 'sinon';
import * as path from 'path';
import {AssetEnum} from '../../../../common/asset/enums/asset.enum';
import {Asset} from '../../../../common/asset/interfaces/asset.interface';

describe('MiddlewareProcessor', () => {
  const assetName: string = 'name';
  const extension: string = 'ts';
  let moduleName: string;

  let sandbox: sinon.SinonSandbox;
  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  let findStub: sinon.SinonStub;
  let generateStub: sinon.SinonStub;
  beforeEach(() => {
    findStub = sandbox.stub(ModuleFinderImpl.prototype, 'find');
    generateStub = sandbox.stub(AssetGenerator.prototype, 'generate').callsFake(() => Promise.resolve());
  });

  describe('#process()', () => {
    context('generate middleware in app module', () => {
      let processor: Processor;
      beforeEach(() => {
        moduleName = 'app';
        findStub.callsFake(() => Promise.resolve('src/app/app.module.ts'));
        processor = new MiddlewareProcessor(assetName, moduleName, extension);
      });

      const assets: Asset[] = [
        {
          type: AssetEnum.MIDDLEWARE,
          filename: path.join(
            process.cwd(),
            'src/app',
            'middlewares',
            'name.middleware.ts'
          ),
          className: 'NameMiddleware',
          template: {
            filename: path.resolve(__dirname, '../../../../assets/ts/middleware/middleware.ts.template'),
            replacer: {
              __CLASS_NAME__: 'NameMiddleware',
              __DIR_NAME__: `'./middlewares/name.middleware'`
            }
          }
        }
      ];

      it('should find the moduleName filename', () => {
        return processor.process()
          .then(() => {
            sinon.assert.calledOnce(findStub);
            sinon.assert.calledWith(findStub, moduleName);
          });
      });

      it('should generate middleware assets', () => {
        return processor.process()
          .then(() => {
            sinon.assert.calledWith(generateStub, assets[0]);
          });
      });
    });
  });
});
