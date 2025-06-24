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

      {data.map((d, i) => { // 各時間帯（データポイント）ごとの処理
        const x = i * (barWidth + barGap) + 40; // 各棒グラフのX座標

        return (
          <g key={i}>
            {/* d.predicted_sales の数だけ rect を生成する部分を map で記述 */}
            {Array.from({ length: d.predicted_sales }).map((_, j) => { // ★この Array.from と map がスマートな点★
              const rectY = height - paddingBottom - (j + 1) * unitHeight; // 下から積み重ねていく

              return (
                <rect
                  key={`${i}-${j}`} // ユニークなキー
                  x={x}
                  y={rectY}
                  width={barWidth}
                  height={unitHeight - 2} // 少し隙間を開けて積み重なっているように見せる
                  fill="#FF6347" // りんごの色
                  stroke="#fff" // 枠線で区切りを明確に
                  strokeWidth="1"
                />
              );
            })}
            {/* 時間表示 */}
            <text
              x={x + barWidth / 2}
              y={height - paddingBottom / 2}
              fontSize="16"
              textAnchor="middle"
              fill="#333"
            >
              {d.hour}時
            </text>
            {/* 販売数表示 (積み重ねた棒グラフの最上部に) */}
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