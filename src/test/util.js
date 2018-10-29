const mocha = require('mocha');
const assert = require('assert');
const util = require('../util');

describe('util', () => {
  describe('checks', () => {
    describe('#getLengthOfIterable()', () => {
      it('should return the length of iterable object given as argument', () => {
        assert.strictEqual(util.checks.getLengthOfIterable([0, 1, 2, 3]), 4);
      });

      it('should throw an error when the argument is not iterable', () => {
        assert.throws(() => util.checks.getLengthOfIterable(null), TypeError)
      });
    });

    describe('#isIterable()', () => {
      it('should return true if an argument\'s "iterator" symbol is a function', () => {
        assert.strictEqual(util.checks.isIterable([]), true);
      });

      it('should return false if an argument\'s "iterator" symbol is not a function', () => {
        assert.strictEqual(util.checks.isIterable({}), false);
      });
    });

    describe('#detectPointMode()', () => {
      it('should return POINTS_MODE.OBJECT if argument is an object with x and y number fields', () => {
        assert.strictEqual(util.checks.detectPointMode({ x: 5, y: 6 }), util.interface.POINTS_MODE.OBJECT);
      });

      it('should return POINTS_MODE.ITERABLE if argument is an iterable and its length equals 2', () => {
        assert.strictEqual(util.checks.detectPointMode([0, 5]), util.interface.POINTS_MODE.ITERABLE);
      });

      it('should return POINTS_MODE.ERROR if argument is not an object or iterable', () => {
        assert.strictEqual(util.checks.detectPointMode(null), util.interface.POINTS_MODE.ERROR);
      });
    });
  });

  describe('errors', () => {

  });
});