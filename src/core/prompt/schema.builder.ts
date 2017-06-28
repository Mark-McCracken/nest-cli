import {Property} from '../../common/prompt/interfaces/property.interface';
import {Schema} from '../../common/prompt/interfaces/schema.interface';

export class SchemaBuilder {
  private _schema: Schema = {
    properties: {}
  };

  public addProperty(name: string, property: Property): SchemaBuilder {
    this._schema.properties[name] = property;
    return this;
  }

  public build(): Schema {
    return this._schema;
  }
}
