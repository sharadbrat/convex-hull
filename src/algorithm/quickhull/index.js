const helper = require('../helper');

const facade = helper.algorithmArgumentFacade;
const lineDistance = helper.lineDistance;
const orientation = helper.orientation;
const ORIENTATION = helper.ORIENTATION;

/**
 * Util class for reduce operation in quickhull algorithm.
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
 * @param p {{x: number, y: number}}
 * @param q {{x: number, y: number}}
 * @param r {{x: number, y: number}}
 * @returns {number}
 */
function findSide(p, q, r) {
  const or = orientation(p, q, r);
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
 * @param points {Array<{x: number, y: number}>}
 * @param hull {Set<{x: number, y: number}>}
 * @param p1 {{x: number, y: number}}
 * @param p2 {{x: number, y: number}}
 * @param side {number}
 */
function subHull(points, hull, p1, p2, side) {
  const point = points.reduce((curr, next) => {
    const distance = lineDistance(p1, p2, next);
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
 * @param points {Points}
 * @returns {Array}
 */
function quickhull(points) {
  const hull = new Set();

  const minXPoint = points.values.reduce((curr, next) => next.x < curr.x ? next : curr, {x: Infinity, y: 0});
  const maxXPoint = points.values.reduce((curr, next) => next.x > curr.x ? next : curr, {x: -Infinity, y: 0});

  subHull(points.values, hull, minXPoint, maxXPoint, 1);
  subHull(points.values, hull, minXPoint, maxXPoint, -1);

  return Array.from(hull);
}

module.exports = facade(quickhull);