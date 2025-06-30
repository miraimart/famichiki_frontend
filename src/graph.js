import React from 'react';
const BarGraph = ({ data }) => {
  const width = 800;
  const height = 520;
  const barWidth = 50;
  const barGap = 40;
  const maxPossibleValue = 4;

  const paddingBottom = 40;
  const paddingTop = 20;  
  const unitHeight = (height - paddingBottom - paddingTop) / maxPossibleValue;
  return (
    <svg width={width} height={height}>
      <line x1="40" y1={height - paddingBottom} x2={width - 20} y2={height - paddingBottom} stroke="#ccc" />

      {data.map((d, i) => {
        const x = i * (barWidth + barGap) + 40;

        return (
          <g key={i}>
            {Array.from({ length: d.predicted_sales }).map((_, j) => {
              const rectY = height - paddingBottom - (j + 1) * unitHeight; 

              return (
                <rect
                  key={`${i}-${j}`} 
                  x={x}
                  y={rectY}
                  width={barWidth}
                  height={unitHeight - 2} 
                  fill="#63BFAE" 
                  stroke="#fff" 
                  strokeWidth="1"
                  rx="6"
                />
              );
            })}
            <text
              x={x + barWidth / 2}
              y={height - paddingBottom /2 +5}
              fontSize="25"
              textAnchor="middle"
              fill="#333"
            >
              {d.hour}時
            </text>
            <text
              x={x + barWidth / 2}
              y={height - paddingBottom - d.predicted_sales * unitHeight - 5}
              fontSize="40"
              textAnchor="middle"
              fill="#63BFAE"
              fontWeight="bold"
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