import {Property} from '../../../common/prompt/interfaces/property.interface';
import {isNullOrUndefined} from 'util';
import {PropertyType} from '../../../common/prompt/enums/property-type.enum';

export class PropertyBuilder {
  private PROPERTY_TYPE_MAP: Map<PropertyType, string> = new Map<PropertyType, string>([
    [ PropertyType.BOOLEAN, 'boolean' ],
    [ PropertyType.INTEGER, 'integer' ],
    [ PropertyType.NUMBER, 'number' ],
    [ PropertyType.STRING, 'string' ]
  ]);

  private _message: string;
  private _type: PropertyType;
  private _required: boolean = false;

  private _pattern: RegExp;
  private _hidden: boolean;

  public addMessage(message: string): PropertyBuilder {
    this._message = message;
    return this;
  }

  public addPattern(pattern: RegExp): PropertyBuilder {
    this._pattern = pattern;
    return this;
  }

  public addRequired(required: boolean): PropertyBuilder {
    this._required = required;
    return this;
  }

  public addHidden(hidden: boolean): PropertyBuilder {
    this._hidden = hidden;
    return this;
  }

  public addDescription(description: string): PropertyBuilder {
    return this;
  }

  public addType(type: PropertyType): PropertyBuilder {
    this._type = type;
    return this;
  }

  public addDefault(defaultValue: string): PropertyBuilder {
    return this;
  }

  public addReplace(replace: string): PropertyBuilder {
    return this;
  }

  public build(): Property {
    const property: Property = {
      message: this._message,
      type: this.PROPERTY_TYPE_MAP.get(this._type),
      required: this._required
    };
    if (!isNullOrUndefined(this._hidden))
      property.hidden = this._hidden;
    if (!isNullOrUndefined(this._pattern))
      property.pattern = this._pattern;
    return property;
  }
}
