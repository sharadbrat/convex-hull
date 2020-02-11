const { getOrientation, ORIENTATION } = require('../helper');


/**
 * Returns leftmost point in points array.
 * @function findLeftMost
 * @param points {{x: number, y: number}[]}
 * @return {{x: number, y: number}}
 */
function findLeftMost(points) {
  return points.reduce((curr, next) => next.x < curr.x ? next : curr, points[0]);
}


/**
 * Returns true, if orientation of ordered triplet (p, q, r) is counterclockwise.
 * @function isOrientationCounterclockwise
 * @param p {{x: number, y: number}}
 * @param q {{x: number, y: number}}
 * @param r {{x: number, y: number}}
 * @return {boolean}
 */
function isOrientationCounterclockwise(p, q, r) {
  return getOrientation(p, q, r) === ORIENTATION.COUNTERCLOCKWISE;
}


/**
 * Returns initial iteration point.
 * @function getIterationPoint
 * @param {{x: number, y: number}[]} points
 * @param {{x: number, y: number}} currentPoint
 * @return {{x: number, y: number}}
 */
function getInitialIterationPoint(points, currentPoint) {
  return points[(points.indexOf(currentPoint) + 1) % points.length];
}


/**
 * Returns returns next point for iteration.
 * @function getIterationPoint
 * @param {{x: number, y: number}[]} points
 * @param {{x: number, y: number}} currentPoint
 * @return {{x: number, y: number}}
 */
function getIterationPoint(points, currentPoint) {
  let iterationPoint = getInitialIterationPoint(points, currentPoint);
  points.forEach(point => {
    if (isOrientationCounterclockwise(currentPoint, point, iterationPoint)) {
      iterationPoint = point;
    }
  });
  return iterationPoint;
}


/**
 * Implements Jarvis's algorithm (gift wrapping algorithm).
 *
 * Description of algorithm:
 *
 * 1) Initialize p as leftmost point.
 *
 * 2) Do following while we don’t come back to the first (or leftmost) point.
 *
 * a) The next point q is the point such that the triplet (p, q, r) is counterclockwise for any other point r.
 *
 * b) next[p] = q (Store q as next of p in the output convex hull).
 *
 * c) p = q (Set p as q for next iteration).
 * @function giftWrapping
 * @param {{x: number, y: number}[]} points
 * @return {{x: number, y: number}[]}
 */
function giftWrapping(points) {
  const leftMost = findLeftMost(points);

  let hull = [];
  let currentPoint = leftMost;

  do {
    hull.push(currentPoint);

    currentPoint = getIterationPoint(points, currentPoint);
  } while (currentPoint !== leftMost);

  return hull;
}

module.exports = giftWrapping;
