import {PropertyBuilder} from '../property.builder';
import {expect} from 'chai';

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

  describe('#build()', () => {
    it('should return the expected property', () => {
      expect(
        builder
          .addMessage('message')
          .addPattern(/message/)
          .addRequired(false)
          .addHidden(false)
          .build()
      ).to.be.deep.equal({
        message: 'message',
        pattern: /message/,
        required: false,
        hidden: false
      });
    });
  });
});
