import { getOrientation, Orientation } from './helper';
import { ConvexHullSearchPoint as Point } from '../index';


interface PointAndDistance {
  point?: Point;
  distance: number;
}

/**
 * @function getLineDistance
 * @param {ConvexHullSearchPoint} p1
 * @param {ConvexHullSearchPoint} p2
 * @param {ConvexHullSearchPoint} q
 * @return {number}
 */
function getLineDistance(p1: Point, p2: Point, q: Point): number {
  return Math.abs((q.y - p1.y) * (p2.x - p1.x) - (p2.y - p1.y) * (q.x - p1.x));
}


/**
 * Returns 1 if orientation is {Orientation.CLOCKWISE}, -1 if orientation is {Orientation.COUNTERCLOCKWISE} and 0 if
 * orientation is {Orientation.COLLINEAR}.
 * @function findSide
 * @param {ConvexHullSearchPoint} p
 * @param {ConvexHullSearchPoint} q
 * @param {ConvexHullSearchPoint} r
 * @return {number}
 */
function findSide(p: Point, q: Point, r: Point): number {
  const or = getOrientation(p, q, r);
  let res;
  switch (or) {
    case Orientation.CLOCKWISE:
      res = 1;
      break;
    case Orientation.COUNTERCLOCKWISE:
      res = -1;
      break;
    case Orientation.COLLINEAR:
    default:
      res = 0;
      break;
  }
  return res;
}


/**
 * Recursive function that represents iteration in quickhull algorithm.
 * @function subHull
 * @param {ConvexHullSearchPoint[]} points
 * @param {Set<ConvexHullSearchPoint>} hull
 * @param {ConvexHullSearchPoint} p1
 * @param {ConvexHullSearchPoint} p2
 * @param {number} side
 * @return {}
 */
function subHull(points: Point[], hull: Set<Point>, p1: Point, p2: Point, side: number) {
  const pointAndDistance = points.reduce<PointAndDistance>((curr, next) => {
    const distance = getLineDistance(p1, p2, next);
    const nextSide = findSide(p1, p2, next);
    return nextSide === side && distance > curr.distance ? { point: next, distance } : curr;
  }, { distance: 0 });

  if (!pointAndDistance.point) {
    hull.add(p1);
    hull.add(p2);
    return;
  }

  subHull(points, hull, pointAndDistance.point, p1, -findSide(pointAndDistance.point, p1, p2));
  subHull(points, hull, pointAndDistance.point, p2, -findSide(pointAndDistance.point, p2, p1));
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
 * @param {ConvexHullSearchPoint[]} points
 * @return {ConvexHullSearchPoint[]}
 */
export default function quickhull(points: Point[]): Point[] {
  const hull = new Set<Point>();

  const minXPoint = points.reduce((curr, next) => next.x < curr.x ? next : curr, {x: Infinity, y: 0});
  const maxXPoint = points.reduce((curr, next) => next.x > curr.x ? next : curr, {x: -Infinity, y: 0});

  subHull(points, hull, minXPoint, maxXPoint, 1);
  subHull(points, hull, minXPoint, maxXPoint, -1);

  return Array.from(hull);
}
