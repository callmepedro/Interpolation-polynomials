import { Point } from '../../common/types';

export const getXRange = (points: Point[]) => {
  let curMinX = 1e9;
  let curMaxX = -1e9;
  points.forEach(point => {
    if (point.x < curMinX) curMinX = point.x;
    if (point.x > curMaxX) curMaxX = point.x;
  });
  return { l: curMinX, r: curMaxX };
};

export const isPointsContainX = (points: Point[], x: number) => {
  for (let i = 0; i < points.length; ++i) {
    if (points[i].x === x) return true;
  }
  return false;
};
