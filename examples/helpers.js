function generatePoints(n = 0) {
  // todo: add impl
}

const EXAMPLE_SETS = [
  {
    given: [
      { x: 0, y: 0 },
      { x: 0, y: 2 },
      { x: 2, y: 2 },
      { x: 1, y: 3 },
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 12, y: 3 },
      { x: 14, y: 6 },
    ],
    expected: [
      { x: 0, y: 0 },
      { x: 12, y: 3 },
      { x: 14, y: 6 },
      { x: 0, y: 3 },
    ],
  },
];

const BASIC_EXAMPLE = EXAMPLE_SETS[0];

module.exports = {
  EXAMPLE_SETS,
  BASIC_EXAMPLE,
  generatePoints
};
