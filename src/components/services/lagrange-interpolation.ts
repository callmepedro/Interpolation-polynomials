import { Point } from '../../common/types';

export const getLagrangePolynomialFromPoints = (points: Point[]) => {
  let strLagrangePolynomial = '';

  for (let i = 0; i < points.length; ++i) {
    const y_i = points[i].y;
    strLagrangePolynomial += `${y_i}*`;

    for (let j = 0; j < points.length; ++j) {
      if (i === j) continue;

      const x_i = points[i].x;
      const x_j = points[j].x;
      strLagrangePolynomial += `((x - ${x_j}) / (${x_i} - ${x_j}))*`;
    }
    strLagrangePolynomial = strLagrangePolynomial.substring(
      0,
      strLagrangePolynomial.length - 1
    );
    strLagrangePolynomial += '+';
  }
  strLagrangePolynomial = strLagrangePolynomial.substring(
    0,
    strLagrangePolynomial.length - 1
  );

  return new Function('x', 'return ' + strLagrangePolynomial);
};
