const ConvexHullSearch = require('../src');
const grahamScan = require('../src/algorithms/graham-scan');
const { BASIC_EXAMPLE } = require('./helpers');

const convexHullSearch = new ConvexHullSearch(grahamScan);

const result = convexHullSearch.perform(BASIC_EXAMPLE.given);

console.log(result);
