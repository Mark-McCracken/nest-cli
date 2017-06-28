import {Property} from './property.interface';

export interface Schema {
  properties: { [key: string]: Property }
}
