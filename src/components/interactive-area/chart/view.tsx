import {
  VictoryAxis,
  VictoryChart,
  VictoryLegend,
  VictoryLine,
  VictoryScatter,
} from 'victory';

import { Point } from '../../../common/types';

type ChartProps = {
  points: Point[];
  lagrangePoints: Point[];
  newtonPoints: Point[];
};

export const Chart = ({ points, lagrangePoints, newtonPoints }: ChartProps) => {
  return (
    <VictoryChart domainPadding={10}>
      <VictoryLine
        data={lagrangePoints}
        style={{ data: { stroke: '#FF2E63' } }}
      />
      <VictoryLine
        data={newtonPoints}
        style={{ data: { stroke: '#08D9D6' } }}
      />
      <VictoryScatter data={points} style={{ data: { fill: '#252A34' } }} />
      <VictoryAxis
        crossAxis
        style={{
          tickLabels: { fontSize: 10 },
        }}
      />
      <VictoryAxis
        crossAxis
        dependentAxis
        style={{
          tickLabels: { fontSize: 10 },
        }}
      />
      <VictoryLegend
        x={0}
        y={5}
        orientation="vertical"
        gutter={40}
        colorScale={['#FF2E63', '#08D9D6']}
        data={[
          { name: 'Интерполяционный многочлен Лагранжа' },
          { name: 'Интерполяционный многочлен Ньютона' },
        ]}
        style={{ labels: { fontSize: 10 } }}
      />
    </VictoryChart>
  );
};
