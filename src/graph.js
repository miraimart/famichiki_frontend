import React from 'react';
const BarGraph = ({ data }) => {
  const width = 600;
  const height = 450;
  const barWidth = 40;
  const barGap = 40;
  const maxPossibleValue = 10;

  const paddingBottom = 40;
  const paddingTop = 20;  
  const unitHeight = (height - paddingBottom - paddingTop) / maxPossibleValue;
  return (
    <svg width={width} height={height} style={{ border: '1px solid #ccc' }}>
      {/* x軸の線 */}
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
                  fill="#FF6347" 
                  stroke="#fff" 
                  strokeWidth="1"
                />
              );
            })}
            <text
              x={x + barWidth / 2}
              y={height - paddingBottom / 2}
              fontSize="16"
              textAnchor="middle"
              fill="#333"
            >
              {d.hour}時
            </text>
            <text
              x={x + barWidth / 2}
              y={height - paddingBottom - d.predicted_sales * unitHeight - 5}
              fontSize="17"
              textAnchor="middle"
              fill="#333"
            >
              {d.predicted_sales}個
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default BarGraph;