const ConvexHullSearch = require('../src');
const giftWrapping = require('../src/algorithms/gift-wrapping');
const { BASIC_EXAMPLE } = require('./helpers');

const convexHullSearch = new ConvexHullSearch(giftWrapping);

const result = convexHullSearch.perform(BASIC_EXAMPLE.given);

console.log(result);
