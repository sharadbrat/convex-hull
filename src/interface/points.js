const castToObjectMode = require('../util/mode-cast').castToObjectMode;
const determinePointsMode = require('../util/checks').determinePointsMode;

/**
 * Represents set of two dimensional points.
 * @type {Points}
 */
module.exports = class Points {
  constructor(points) {
    this.mode = determinePointsMode(points);
    this.values = castToObjectMode(points, this.mode);
    this.size = this.values.length;
  }
};
