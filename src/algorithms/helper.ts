import { ConvexHullSearchPoint as Point } from "../index";


/**
 * Types of orientation of points.
 * @enum {Orientation}
 */
export enum Orientation {
  COLLINEAR = 'collinear',
  CLOCKWISE = 'clockwise',
  COUNTERCLOCKWISE = 'counterclockwise',
}


/**
 * Returns orientation of ordered triplet (p, q, r).
 * @param p {ConvexHullSearchPoint}
 * @param q {ConvexHullSearchPoint}
 * @param r {ConvexHullSearchPoint}
 * @returns {Orientation}
 */
export function getOrientation(p: Point, q: Point, r: Point): Orientation {
  let res;
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

  if (val > 0) {
    res = Orientation.CLOCKWISE;
  } else if (val < 0) {
    res = Orientation.COUNTERCLOCKWISE;
  } else {
    res = Orientation.COLLINEAR;
  }

  return res;
}
