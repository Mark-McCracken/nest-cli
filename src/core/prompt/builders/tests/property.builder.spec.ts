import {PropertyBuilder} from '../property.builder';
import {expect} from 'chai';
import {PropertyType} from '../../../../common/prompt/enums/property-type.enum';

describe('PropertyBuilder', () => {
  let builder: PropertyBuilder;
  beforeEach(() => builder = new PropertyBuilder());

  describe('#addMessage()', () => {
    it('should return the builder instance', () => {
      expect(builder.addMessage('message')).to.be.equal(builder);
    });
  });

  describe('#addPattern()', () => {
    it('should return the builder instance', () => {
      expect(builder.addPattern(/message/)).to.be.equal(builder);
    });
  });

  describe('#addRequired()', () => {
    it('should return the builder instance', () => {
      expect(builder.addRequired(false)).to.be.equal(builder);
    });
  });

  describe('#addHidden()', () => {
    it('should return the builder instance', () => {
      expect(builder.addHidden(false)).to.be.equal(builder);
    });
  });

  describe('#addDescription()', () => {
    it('should return the builder instance', () => {
      expect(builder.addDescription('description')).to.be.equal(builder);
    });
  });

  describe('#addType()', () => {
    it('should return the builder instance', () => {
      expect(builder.addType(PropertyType.STRING)).to.be.equal(builder);
    });
  });

  describe('#addDefault()', () => {
    it('should return the builder instance', () => {
      expect(builder.addDefault('default')).to.be.equal(builder);
    });
  });

  describe('#addReplace()', () => {
    it('should return the builder instance', () => {
      expect(builder.addReplace('*')).to.be.equal(builder);
    });
  });

  describe('#build()', () => {
    it('should build the minimum property attributes with message and type', () => {
      expect(
        builder
          .addMessage('message')
          .addType(PropertyType.STRING)
          .build()
      ).to.be.deep.equal({
        message: 'message',
        type: 'string',
        required: false
      });
    });

    it('should build the minimum property attributes with type different to string', () => {
      expect(
        builder
          .addMessage('message')
          .addType(PropertyType.BOOLEAN)
          .build()
      ).to.be.deep.equal({
        message: 'message',
        type: 'boolean',
        required: false
      });
    });

    it('should build a property with a pattern', () => {
      expect(
        builder
          .addMessage('message')
          .addType(PropertyType.STRING)
          .addPattern(/pattern/)
          .build()
      ).to.be.deep.equal({
        message: 'message',
        type: 'string',
        pattern: /pattern/,
        required: false
      });
    });

    it('should build a required property with a pattern', () => {
      expect(
        builder
          .addMessage('message')
          .addType(PropertyType.STRING)
          .addRequired(true)
          .build()
      ).to.be.deep.equal({
        message: 'message',
        type: 'string',
        required: true
      });
    });
  });
});
