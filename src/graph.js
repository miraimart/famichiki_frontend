import React from 'react';

const BarGraph = ({ data }) => {
  const width = 600;
  const height = 400;
  const barWidth = 40;
  const barGap = 20;
  const maxValue = Math.max(...data.map(d => d.predicted_sales));

  return (
    <svg width={width} height={height} style={{ border: '1px solid #ccc' }}>
      {data.map((d, i) => {
        const barHeight = (d.predicted_sales / maxValue) * (height - 40);
        const x = i * (barWidth + barGap) + 30;
        const y = height - barHeight - 20;

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#4caf50"
            />
            <text
              x={x + barWidth / 2}
              y={height - 5}
              fontSize="12"
              textAnchor="middle"
            >
              {d.hour}時
            </text>
            <text
              x={x + barWidth / 2}
              y={y - 5}
              fontSize="12"
              textAnchor="middle"
              fill="#333"
            >
              {d.predicted_sales}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default BarGraph;
