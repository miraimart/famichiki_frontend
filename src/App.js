import './App.css';
import logo from './imgaes/mart_green.png';
import React, { useEffect, useState } from 'react';
import { CurrentTime, GetCurrentHour } from './time';
import { useNavigate } from 'react-router-dom'; 


function App() {
  const [predictedSales, setPredictedSales] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
  fetch('https://famichiki-backend.onrender.com/predict') 
    .then(res => res.json())
    .then(data => {
      const now = GetCurrentHour();
      // 6時間分の時間配列を作成
      const targetHours = Array.from({ length: 6 }, (_, i) => (now + i) % 24);

      const filtered = data.predictions
        ? data.predictions.filter(item => {
            const hourNum = parseInt(item.hour, 10);
            return targetHours.includes(hourNum);
          })
        : [];

      // 予測個数の合計を計算
      const total = filtered.reduce(
        (sum, item) => sum + Number(item.predicted_sales), 0
      );

      setPredictedSales([{ hour: `${now}時〜${targetHours[5]}時`, predicted_sales: total }]);
    })
    .catch(err => console.error(err));
}, []);


  return (
    <div className="App">
      <div className="appbar">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="appbar-title">
          <CurrentTime />
        </div>
      </div>
      <div className="App-body">
        <div className = "centerText">
          {predictedSales.length > 0
            ? predictedSales.map((item, i) => (
                <div key={i}>
                  {item.hour}時の予測: {item.predicted_sales} 個
                </div>
              ))
            : "データ取得中..."}
        </div>
      </div>
      <div className="bottom-bar">
        <button
          className="bottom-button"
          onClick={() => navigate('/next')}
        >
          ボタン
        </button>
      </div>
    </div>
  );
}

export default App;

