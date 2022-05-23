import { useEffect, useState } from 'react';

import { Alert, Button, Form, InputGroup } from 'react-bootstrap';

import './interactive-area.scss';
import { Point } from '../../common/types';
import { getLagrangePolynomialFromPoints } from '../services/lagrange-interpolation';
import { getNewtonPolynomialFromPoints } from '../services/newton-interpolation';
import { getXRange, isPointsContainX } from '../services/utils';
import { Chart } from './chart';

export const InteractiveArea = () => {
  const [lagrangePoints, setLagrangePoints] = useState<Point[]>([]);
  const [newtonPoints, setNewtonPoints] = useState<Point[]>([]);

  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const pointsRange = getXRange(points);

    const L = getLagrangePolynomialFromPoints(points);
    const N = getNewtonPolynomialFromPoints(points);

    const curLagrangePoints: Point[] = [];
    const curNewtonPoints: Point[] = [];

    for (let i = pointsRange.l; i <= pointsRange.r; i += 0.01) {
      if (L !== undefined && !isNaN(L(i)))
        curLagrangePoints.push({ x: i, y: L(i) });
      if (N !== undefined && !isNaN(N(i)))
        curNewtonPoints.push({ x: i, y: N(i) });
    }
    setLagrangePoints(curLagrangePoints);
    setNewtonPoints(curNewtonPoints);
  }, [points]);

  const [inputX, setInputX] = useState('');
  const [inputY, setInputY] = useState('');
  const [isAlert, setIsAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  return (
    <div className={'interactive-area'}>
      <InputGroup>
        <Form.Control
          required
          type={'text'}
          placeholder={'x'}
          aria-required={true}
          onChange={event => setInputX(event.target.value)}
        />
        <Form.Control
          required
          type={'text'}
          placeholder={'y'}
          aria-required={true}
          onChange={event => setInputY(event.target.value)}
        />
        <Button
          variant="dark"
          onClick={() => {
            setIsAlert(false);
            if (
              inputX === '' ||
              inputY === '' ||
              isNaN(Number(inputX)) ||
              isNaN(Number(inputY))
            ) {
              setIsAlert(true);
              setAlertText('Введенные значения должны быть числами');
              return;
            }
            if (isPointsContainX(points, parseFloat(inputX))) {
              setIsAlert(true);
              setAlertText('Точка с таким X уже существует');
              return;
            }
            setPoints([
              ...points,
              { x: parseFloat(inputX), y: parseFloat(inputY) },
            ]);
          }}
        >
          add
        </Button>
      </InputGroup>

      <Chart
        points={points}
        lagrangePoints={lagrangePoints}
        newtonPoints={newtonPoints}
      />

      {isAlert ? (
        <Alert variant="danger" className={'validation-alert'}>
          {alertText}
        </Alert>
      ) : (
        ''
      )}
    </div>
  );
};
