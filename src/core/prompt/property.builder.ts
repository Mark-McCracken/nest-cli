import {Property} from '../../common/prompt/interfaces/property.interface';

export class PropertyBuilder {
  private _message: string;
  private _pattern: RegExp;
  private _required: boolean = false;
  private _hidden: boolean = false;

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

  public build(): Property {
    return {
      message: this._message,
      pattern: this._pattern,
      required: this._required,
      hidden: this._hidden
    };
  }
}
