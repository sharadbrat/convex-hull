/**
 * Error that occurs, when given argument to the algorithm is empty.
 * @type {EmptyArgumentError}
 */
class EmptyArgumentError extends Error {
    constructor() {
        super('Points argument is falsy');
    }
}

/**
 * Error that occurs, when given argument's size is less than 3.
 * @type {ArgumentSizeError}
 */
class ArgumentSizeError extends Error {
  constructor() {
    super('Points argument\'s size is less than 3');
  }
}

/**
 * Error that occurs, when given argument to the algorithm is not iterable.
 * @type {NotIterableArgumentError}
 */
class NotIterableArgumentError extends Error {
    constructor() {
        super('Points argument must be iterable');
    }
}

/**
 * Error that occurs, when {POINTS_MODE} of given argument to the algorithm can not be determined.
 * @type {PointsModeCantBeDeterminedError}
 */
class PointsModeCantBeDeterminedError extends Error {
    constructor() {
        super('Points argument provides items in different or incorrect format. Items must be object with x and y' +
          ' properties ({x: number, y: number}) or iterable with size of two ([number, number])');
    }
}

/**
 * Error that occurs when mode of point can not be casted to the other mode.
 * @type {ModeCastError}
 */
class ModeCastError extends Error {
  constructor(fromMode, toMode) {
    super(`Can not cast [${fromMode}] mode points to [${toMode}] mode points`);
  }
}

module.exports = {
  EmptyArgumentError,
  ArgumentSizeError,
  NotIterableArgumentError,
  PointsModeCantBeDeterminedError,
  ModeCastError
};
