const EmptyArgumentError = require('./error').EmptyArgumentError;
const NotIterableArgumentError = require('./error').NotIterableArgumentError;
const PointsModeCantBeDeterminedError = require('./error').PointsModeCantBeDeterminedError;
const ArgumentSizeError = require('./error').ArgumentSizeError;
const POINTS_MODE = require('./points-mode');

/**
 * Checks if given argument is in correct format. Throws corresponding error, if argument is incorrect in any meaning.
 * @throws {EmptyArgumentError}
 * @throws {NotIterableArgumentError}
 * @throws {PointsModeCantBeDeterminedError}
 * @param points
 */
function checkArgumentCorrect(points) {
  if (!points) {
    throw new EmptyArgumentError();
  }

  if (!isIterable(points)) {
    throw new NotIterableArgumentError();
  }

  if (getLengthOfIterable(points) < 3) {
    throw new ArgumentSizeError();
  }

  const pointsMode = determinePointsMode(points);

  if (pointsMode === POINTS_MODE.ERROR) {
    throw new PointsModeCantBeDeterminedError()
  }
}

/**
 * Returns {POINTS_MODE.ERROR} if points are given in different or incorrect formats.
 * Otherwise returns relevant {POINTS_MODE}.
 * @param {object} points
 * @returns {POINTS_MODE}
 */
function determinePointsMode(points) {
  const modesSet = new Set();
  for (let point of points) {
    modesSet.add(detectPointMode(point));
  }
  return detectPointsMode(modesSet)
}

/**
 * Returns {true} if argument is iterable, otherwise returns {false}.
 * @param {object} value
 * @returns {boolean}
 */
function isIterable(value) {
  return typeof value[Symbol.iterator] === 'function';
}

/**
 * If the size of input argument is exact one, then returns the only element of input argument set.
 * Otherwise returns {POINTS_MODE.ERROR}.
 * @param {Set} modesSet
 * @returns {POINTS_MODE}
 */
function detectPointsMode(modesSet) {
  let mode;
  if (modesSet.size === 1) {
    mode = Array.from(modesSet)[0];
  } else {
    mode = POINTS_MODE.ERROR
  }
  return mode;
}

/**
 * Returns mode of given point.
 * @param {object} point
 * @returns {POINTS_MODE}
 */
function detectPointMode(point) {
  let mode;
  if (point instanceof Object && typeof point.x === 'number' && typeof point.y === 'number') {
    mode = POINTS_MODE.OBJECT;
  } else if (isIterable(point) && getLengthOfIterable(point) === 2) {
    mode = POINTS_MODE.ITERABLE;
  } else {
    mode = POINTS_MODE.ERROR;
  }
  return mode;
}

/**
 * Returns length of iterable collection
 * @param {object} iterable
 * @returns {number}
 */
function getLengthOfIterable(iterable) {
  return Array.from(iterable).length;
}

module.exports.determinePointsMode = determinePointsMode;
module.exports.checkArgumentCorrect = checkArgumentCorrect;
