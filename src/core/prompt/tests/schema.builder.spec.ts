import {SchemaBuilder} from '../schema.builder';
import {expect} from 'chai';
import {Property} from '../../../common/prompt/interfaces/property.interface';

describe('SchemaBuilder', () => {
  let builder: SchemaBuilder;

  beforeEach(() => builder = new SchemaBuilder());

  const property: Property = {
    message: 'message',
    pattern: /message/
  };

  describe('#addProperty()', () => {
    it('should return the builder instance', () => {
      expect(builder.addProperty('name', property)).to.be.equal(builder);
    });
  });

  describe('#build()', () => {
    it('should build the expected schema', () => {
      expect(
        builder
          .addProperty('name', property)
          .build()
      ).to.be.deep.equal({
        properties: {
          name: property
        }
      });
    });
  });
});
