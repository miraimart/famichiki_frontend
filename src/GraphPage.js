import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './imgaes/mart_green.png';
import { CurrentTime, GetCurrentHour } from './time';
import BarGraph from './graph';
import { useNavigate } from 'react-router-dom';


function GraphPage() {
  const [predictedSales, setPredictedSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://famichiki-backend.onrender.com/predict') // ← 実際のAPI URL
      .then(res => res.json())
      .then(data => {
        const now = GetCurrentHour();
        // 0〜8時間後までの時間を配列で作成
        const targetHours = Array.from({ length: 9 }, (_, i) => (now + i) % 24);

        const filtered = data.predictions.filter(item => {
          const hourNum = parseInt(item.hour, 10);
          return targetHours.includes(hourNum);
        });

        console.log('filtered:', filtered);

        setPredictedSales(filtered);
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
        <hr />
        <h2>ファミチキの揚げ予測個数</h2>
        <BarGraph data={predictedSales} />
         <div className="bottom-bar">
        <button
          className="bottom-button"
           onClick={() => navigate(-1)}
        >
          ホームに戻る
        </button>
      </div>
      </div>
    </div>
  );
}

export default GraphPage;