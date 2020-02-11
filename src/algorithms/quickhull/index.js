const { getOrientation, ORIENTATION } = require('../helper');


/**
 * @function getLineDistance
 * @param {{x: number, y: number}} p1
 * @param {{x: number, y: number}} p2
 * @param {{x: number, y: number}} q
 * @return {number}
 */
function getLineDistance(p1, p2, q) {
  return Math.abs((q.y - p1.y) * (p2.x - p1.x) - (p2.y - p1.y) * (q.x - p1.x));
}


/**
 * Util class for reduce operation in quickhull algorithms.
 * @type {PointAndDistance}
 */
class PointAndDistance {
  constructor(point, distance) {
    this.value = point;
    this.distance = distance;
  }
}


/**
 * Returns 1 if orientation is {ORIENTATION.CLOCKWISE}, -1 if orientation is {ORIENTATION.COUNTERCLOCKWISE} and 0 if
 * orientation is {ORIENTATION.COLLINEAR}.
 * @function findSide
 * @param {{x: number, y: number}} p
 * @param {{x: number, y: number}} q
 * @param {{x: number, y: number}} r
 * @return {number}
 */
function findSide(p, q, r) {
  const or = getOrientation(p, q, r);
  let res;
  switch (or) {
    case ORIENTATION.CLOCKWISE:
      res = 1;
      break;
    case ORIENTATION.COUNTERCLOCKWISE:
      res = -1;
      break;
    case ORIENTATION.COLLINEAR:
    default:
      res = 0;
      break;
  }
  return res;
}


/**
 * Recursive function that represents iteration in quickhull algorithm.
 * @function subHull
 * @param {{x: number, y: number}[]} points
 * @param {Set<{x: number, y: number}>} hull
 * @param {{x: number, y: number}} p1
 * @param {{x: number, y: number}} p2
 * @param {number} side
 * @return {PointAndDistance | undefined}
 */
function subHull(points, hull, p1, p2, side) {
  const point = points.reduce((curr, next) => {
    const distance = getLineDistance(p1, p2, next);
    const nextSide = findSide(p1, p2, next);
    return nextSide === side && distance > curr.distance ? new PointAndDistance(next, distance) : curr;
  }, new PointAndDistance(null, 0));

  if (!point.value) {
    hull.add(p1);
    hull.add(p2);
    return;
  }

  subHull(points, hull, point.value, p1, -findSide(point.value, p1, p2));
  subHull(points, hull, point.value, p2, -findSide(point.value, p2, p1));
}


/**
 * Implements quickhull algorithm.
 *
 * Description of algorithm:
 *
 * 1) Find the point with minimum x-coordinate lets say, min_x and similarly the point with maximum x-coordinate, max_x.
 *
 * 2) Make a line joining these two points, say L. This line will divide the the whole set into two parts. Take both
 * the parts one by one and proceed further.
 *
 * 3)For a part, find the point P with maximum distance from the line L. P forms a triangle with the points min_x,
 * max_x. It is clear that the points residing inside this triangle can never be the part of convex hull.
 *
 * 4)The above step divides the problem into two sub-problems (solved recursively). Now the line joining the points P
 * and min_x and the line joining the points P and max_x are new lines and the points residing outside the triangle is
 * the set of points. Repeat point no. 3 till there no point left with the line. Add the end points of this point to
 * the convex hull.
 * @param {{x: number, y: number}[]} points
 * @return {{x: number, y: number}[]}
 */
function quickhull(points) {
  const hull = new Set();

  const minXPoint = points.reduce((curr, next) => next.x < curr.x ? next : curr, {x: Infinity, y: 0});
  const maxXPoint = points.reduce((curr, next) => next.x > curr.x ? next : curr, {x: -Infinity, y: 0});

  subHull(points, hull, minXPoint, maxXPoint, 1);
  subHull(points, hull, minXPoint, maxXPoint, -1);

  return Array.from(hull);
}

module.exports = quickhull;
