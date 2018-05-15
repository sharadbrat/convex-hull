const Points = require('../interface/points');
const checkPoints = require('../util/checks').checkArgumentCorrect;
/**
 * Check if point is in hull already.
 * @param {{x: number, y: number}} point
 * @param {Array} hull
 * @return {boolean}
 */
function isPointInHull(point, hull) {
  return !!hull.find(el => el === point);
}

/**
 * Higher order function that converts argument of default input to algorithms input
 * @param {function(Points): [{x: number, y: number}]} algorithm
 * @returns {function([{x: number, y: number}] | [[]]): [{x: number, y: number}]}
 */
function algorithmArgumentFacade(algorithm) {
  return (points) => {
    checkPoints(points);
    return algorithm(new Points(points));
  };
}

/**
 * Types of orientation of points.
 * @readonly
 * @enum {ORIENTATION}
 */
const ORIENTATION = {
  COLLINEAR: 'collinear',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * Returns orientation of ordered triplet (p, q, r).
 * @param p {{x: number, y: number}}
 * @param q {{x: number, y: number}}
 * @param r {{x: number, y: number}}
 * @returns {ORIENTATION}
 */
function orientation(p, q, r) {
  let res;
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

  if (val > 0) {
    res = ORIENTATION.CLOCKWISE;
  } else if (val < 0) {
    res = ORIENTATION.COUNTERCLOCKWISE;
  } else {
    res = ORIENTATION.COLLINEAR;
  }

  return res;
}

function distance(p, q) {
  return Math.pow(p.y - q.y, 2) + Math.pow(p.x - q.x, 2);
}

function lineDistance(p1, p2, q) {
  return Math.abs((q.y - p1.y) * (p2.x - p1.x) - (p2.y - p1.y) * (q.x - p1.x));
}

module.exports.isPointInHull = isPointInHull;
module.exports.algorithmArgumentFacade = algorithmArgumentFacade;
module.exports.ORIENTATION = ORIENTATION;
module.exports.orientation = orientation;
module.exports.lineDistance = lineDistance;
module.exports.distance = distance;
