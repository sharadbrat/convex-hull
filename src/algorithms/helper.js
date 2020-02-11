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
function getOrientation(p, q, r) {
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

function getDistance(p, q) {
  return Math.pow(p.y - q.y, 2) + Math.pow(p.x - q.x, 2);
}


module.exports = {
  ORIENTATION,
  getOrientation,
  getDistance,
};
