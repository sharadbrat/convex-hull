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

module.exports.isPointInHull = isPointInHull;
module.exports.algorithmArgumentFacade = algorithmArgumentFacade;
