const PI = Math.PI;


/**
 * Check if point is in hull already.
 * @function isPointInHull
 * @param {{x: number, y: number}} point
 * @param {Object[]} hull
 * @return {boolean}
 */
function isPointInHull(point, hull) {
  return hull.some(el => el === point);
}


/**
 * Calculates polar angle of a point.
 * @function polarAngle
 * @param {{x: number, y: number}} point
 * @return {number} Polar angle of a point.
 */
function polarAngle(point) {
  return Math.atan2(point.y, point.x) * (180.0 / PI);
}


/**
 * Calculates cos between lines AB and BC.
 * @function calcCos
 * @param {{x: number, y: number}} a
 * @param {{x: number, y: number}} b
 * @param {{x: number, y: number}} c
 * @return {number} Cosine between AB and BC lines.
 */
function calcCos(a, b, c) {
  const xAB = b.x - a.x;
  const yAB = b.y - a.y;
  const xBC = c.x - b.x;
  const yBC = c.y - b.y;
  const scalarProduct = xAB * xBC + yAB * yBC;
  const moduleAB = Math.sqrt(xAB * xAB + yAB * yAB);
  const moduleBC = Math.sqrt(xBC * xBC + yBC * yBC);
  const module = moduleAB * moduleBC;
  return -scalarProduct / module;
}


/**
 * Returns first point of convex hull.
 * The point will be the leftmost and bottommost point.
 * @param {{x: number, y: number}[]} points
 * @returns {{x: number, y: number}}
 */
function getFirstPoint(points) {
  let first = points[0];

  for (let point of points) {
    if (point.x < first.x || (point.x === first.x && point.y < first.y)) {
      first = point;
    }
  }
  return first;
}

/**
 * Returns second point of convex hull.
 * The point will be the point with the minimal polar angle (except first point, that is already in hull)
 * @function getSecondPoint
 * @param {{x: number, y: number}[]} points
 * @param {{x: number, y: number}} first
 * @returns {{x: number, y: number}}
 */
function getSecondPoint(points, first) {
  let minAngle = Number.MAX_SAFE_INTEGER;
  let minAnglePoint;

  for (let point of points) {

    if (point === first)
      continue;

    let angle = polarAngle(point);

    if (point.x > first.x && (angle >= 0 && angle < minAngle)) {
      minAngle = angle;
      minAnglePoint = point;
    }
  }
  return minAnglePoint;
}

/**
 * Returns next point, that should be added to hull.
 * @function getNextHullPoint
 * @param {{x: number, y: number}[]} points
 * @param {{x: number, y: number}[]} hull
 * @returns {{x: number, y: number}}
 */
function getNextHullPoint(points, hull) {
  let minCos = Number.MAX_SAFE_INTEGER;
  let minCosPoint;
  let size = hull.length;

  for (let point of points) {

    if (!(isPointInHull(point, hull) && point !== hull[0])) {
      const a = hull[size - 2];
      const b = hull[size - 1];
      const cos = calcCos(a, b, point);

      if (cos < minCos) {
        minCos = cos;
        minCosPoint = point;
      }
    }
  }

  return minCosPoint;
}


/**
 * Implements algorithms of graham scan and finds minimal convex hull.
 *
 * Description of algorithm:
 *
 * 1) Let H be the list of points on the convex hull, initialized to be empty.
 *
 * 2) Choose P0 to be the point with the lowest y-coordinate. Add P0 to H since P0 is definitely in the convex hull.
 *
 * 3) Let (P1, P2, ..., Pn) be the remaining points sorted by their polar angles relative to P0 from smallest to
 * largest. Iterating through the points in sorted order should sweep around P0 in counterclockwise order.
 *
 * 4) For each point Pi:
 * (a) If adding Pi to our convex hull results in making a “left turn”, add Pi to H
 * (b) If adding Pi to our convex hull results in making a “right turn”, remove elements from H until adding Pi makes a
 * left turn, then add Pi to H.
 * @function grahamScan
 * @param {{x: number, y: number}[]} points
 * @returns {Array}
 */
function grahamScan(points) {
  let hull = [];

  const first = getFirstPoint(points);
  hull.push(first);

  hull.push(getSecondPoint(points, first));

  do {
    hull.push(getNextHullPoint(points, hull))
  } while (hull[hull.length - 1] !== first);

  return hull.slice(0, hull.length - 1);
}


module.exports = grahamScan;
