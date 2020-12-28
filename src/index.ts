import giftWrapping from './algorithms/gift-wrapping.algorithm';
import grahamScan from './algorithms/graham-scan.algorithm';
import quickhull from './algorithms/quickhull.algorithm';


export type ConvexHullSearchAlgorithm = 'graham-scan' | 'gift-wrapping' | 'quick-hull';


export type ConvexHullSearchAlgorithmFunction = (points: ConvexHullSearchPoint[]) => ConvexHullSearchPoint[];


export interface ConvexHullSearchOptions {
  algorithm: ConvexHullSearchAlgorithm;
}


export interface ConvexHullSearchPoint {
  x: number;
  y: number;
}


const defaultAlgorithm = (points: ConvexHullSearchPoint[]): ConvexHullSearchPoint[] => {
  return points;
};


export default class ConvexHullSearch {
  private readonly algorithm: ConvexHullSearchAlgorithm;

  private readonly defaultAlgorithm = defaultAlgorithm;

  public constructor(options: ConvexHullSearchOptions) {
    this.algorithm = options.algorithm;
  }

  public perform(points: ConvexHullSearchPoint[]): ConvexHullSearchPoint[] {
    const algorithm = this.getAlgorithmFunction(this.algorithm);
    if (algorithm) {
      this.checkArgument(points);
      return algorithm(points);
    }
  }

  private checkArgument(points: any) {
    if (!(points instanceof Array)) {
      throw new Error('Points for convex hull search must be of type: {x: number, y: number}[]');
    }
  }

  private getAlgorithmFunction(algorithm: ConvexHullSearchAlgorithm): ConvexHullSearchAlgorithmFunction {
    switch (algorithm) {
      case "gift-wrapping":
        return giftWrapping;
      case "graham-scan":
        return grahamScan;
      case "quick-hull":
        return quickhull;
      default:
        return this.defaultAlgorithm;
    }
  }
};
