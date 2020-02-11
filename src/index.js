module.exports = class ConvexHullSearch {

  constructor(algorithm) {
    this.checkAlgorithmArgument(algorithm);
    this.algorithm = algorithm || this.defaultAlgorithm;
  }

  perform(points) {
    this.checkArgument(points);
    return this.algorithm(points);
  }

  defaultAlgorithm(points) {
    return points;
  }

  checkAlgorithmArgument(algorithm) {
    // todo: add impl
  }

  checkArgument(points) {
    // todo: add impl
  }
};
