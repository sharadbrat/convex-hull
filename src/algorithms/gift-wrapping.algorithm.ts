import { getOrientation, Orientation } from './helper';
import { ConvexHullSearchPoint as Point } from "../index";


/**
 * Returns leftmost point in points array.
 * @function findLeftMost
 * @param {ConvexHullSearchPoint[]} points
 * @return {ConvexHullSearchPoint}
 */
function findLeftMost(points: Point[]): Point {
  return points.reduce((curr, next) => next.x < curr.x ? next : curr, points[0]);
}


/**
 * Returns true, if orientation of ordered triplet (p, q, r) is counterclockwise.
 * @function isOrientationCounterclockwise
 * @param {ConvexHullSearchPoint} p
 * @param {ConvexHullSearchPoint} q
 * @param {ConvexHullSearchPoint} r
 * @return {boolean}
 */
function isOrientationCounterclockwise(p: Point, q: Point, r: Point): boolean {
  return getOrientation(p, q, r) === Orientation.COUNTERCLOCKWISE;
}


/**
 * Returns initial iteration point.
 * @function getIterationPoint
 * @param {ConvexHullSearchPoint[]} points
 * @param {ConvexHullSearchPoint} currentPoint
 * @return {ConvexHullSearchPoint}
 */
function getInitialIterationPoint(points: Point[], currentPoint: Point): Point {
  return points[(points.indexOf(currentPoint) + 1) % points.length];
}


/**
 * Returns returns next point for iteration.
 * @function getIterationPoint
 * @param {ConvexHullSearchPoint[]} points
 * @param {ConvexHullSearchPoint} currentPoint
 * @return {ConvexHullSearchPoint}
 */
function getIterationPoint(points: Point[], currentPoint: Point): Point {
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
export default function giftWrapping(points: Point[]): Point[] {
  const leftMost = findLeftMost(points);

  let hull = [];
  let currentPoint = leftMost;

  do {
    hull.push(currentPoint);

    currentPoint = getIterationPoint(points, currentPoint);
  } while (currentPoint !== leftMost);

  return hull;
}
