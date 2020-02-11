const ConvexHullSearch = require('../src');
const quickhull = require('../src/algorithms/quickhull');
const { BASIC_EXAMPLE } = require('./helpers');

const convexHullSearch = new ConvexHullSearch(quickhull);

const result = convexHullSearch.perform(BASIC_EXAMPLE.given);

console.log(result);
