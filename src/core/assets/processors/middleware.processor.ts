import {Processor} from '../../../common/processor/interfaces/processor.interface';
import {ModuleFinderImpl} from '../module-finders/module.finder';
import {AssetGenerator} from '../generators/asset.generator';
import {ModuleFinder} from '../../../common/asset/interfaces/module.finder.interface';
import {Generator} from '../../../common/asset/interfaces/generator.interface';
import {Asset} from '../../../common/asset/interfaces/asset.interface';
import {AssetEnum} from '../../../common/asset/enums/asset.enum';
import {FileNameBuilder} from '../builders/file-name.builder';
import {ClassNameBuilder} from '../builders/class-name.builder';
import {AssetBuilder} from '../builders/asset.builder';
import * as path from 'path';
import {TemplateBuilder} from '../builders/template.builder';

export class MiddlewareProcessor implements Processor {
  private _finder: ModuleFinder;
  private _generator: Generator;
  
  constructor(
    private _assetName: string,
    private _moduleName: string,
    private _extension: string
  ) {
    this._finder = new ModuleFinderImpl();
    this._generator = new AssetGenerator();
  }

  public process(): Promise<void> {
    return this._finder.find(this._moduleName)
      .then(moduleFilename => {
        const assets: Asset[] = this.buildAssets(moduleFilename);
        return this.generate(assets);
      });
  }

  private buildAssets(moduleFilename: string): Asset[] {
    const assets: Asset[] = [];
    const className: string = this.buildClassName();
    const filename: string = this.buildFilename();
    assets.push(this.buildClassAsset(className, filename, moduleFilename));
    return assets
  }

  private buildClassName() {
    return new ClassNameBuilder()
      .addName(this._assetName)
      .addAsset(AssetEnum.MIDDLEWARE)
      .build();
  }

  private buildFilename() {
    return new FileNameBuilder()
      .addAsset(AssetEnum.MIDDLEWARE)
      .addName(this._assetName)
      .addExtension(this._extension)
      .addTest(false)
      .build();
  }

  private buildClassAsset(className: string, filename: string, moduleFilename: string): Asset {
    return new AssetBuilder()
      .addType(AssetEnum.MIDDLEWARE)
      .addClassName(className)
      .addFilename(this.buildClassAssetFilename(filename, moduleFilename))
      .addTemplate(this.buildClassAssetTemplate(filename, className))
      .build();
  }

  private buildClassAssetFilename(filename: string, moduleName: string) {
    return path.join(
      process.cwd(),
      path.dirname(moduleName),
      'middlewares',
      filename
    );
  }

  private buildClassAssetTemplate(filename: string, className: string) {
    return new TemplateBuilder()
      .addFilename(path.resolve(__dirname, `../../../assets/${ this._extension }/middleware/middleware.${ this._extension }.template`))
      .addReplacer({
        __CLASS_NAME__: className,
        __DIR_NAME__: `'./middlewares/${ filename.replace(`.${ this._extension }`, '') }'`
      })
      .build();
  }

  private generate(assets: Asset[]): Promise<void> {
    return this._generator.generate(assets[0]);
  }

}
