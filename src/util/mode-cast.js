const POINTS_MODE = require('./interface');

const ModeCastError = require('./error').ModeCastError;

/**
 * Casts every point to given mode.
 * @param {array} points
 * @param {POINTS_MODE} mode
 * @returns {*}
 */
function castToObjectMode(points, mode) {
  if (mode === POINTS_MODE.OBJECT) {
    return Array.from(points);
  } else if (mode === POINTS_MODE.ITERABLE) {
    return Array.from(points).map(el => castPointFromIterableToObject(el));
  } else {
    throw new ModeCastError(mode, POINTS_MODE.OBJECT);
  }
}

/**
 * Casts point from iterable to object mode (i.e. [0, 1] -> {x: 0, y: 1}).
 * @param {[[]]} point
 * @returns {{x: number, y: number}}
 */
function castPointFromIterableToObject(point) {
  const iter = point[Symbol.iterator]();
  const x = iter.next().value;
  const y = iter.next().value;
  return {x, y}
}

module.exports.castToObjectMode = castToObjectMode;