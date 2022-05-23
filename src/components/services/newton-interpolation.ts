import { Point } from '../../common/types';

const f: (points: Point[]) => number = (points: Point[]) => {
  if (points.length === 1) return points[0].y;

  return (
    (f(points.slice(1)) - f(points.slice(0, -1))) /
    (points[points.length - 1].x - points[0].x)
  );
};

export const getNewtonPolynomialFromPoints = (points: Point[]) => {
  if (points.length <= 1) return undefined;

  let strNewtonPolynomial = `${f(points.slice(0, 1))}`;

  for (let i = 1; i <= points.length; ++i) {
    strNewtonPolynomial += ` + ${f(points.slice(0, i + 1))}`;

    for (let j = 0; j <= i - 1; ++j) {
      strNewtonPolynomial += ` * (x - ${points[j].x})`;
    }
  }

  return new Function('x', 'return ' + strNewtonPolynomial);
};
