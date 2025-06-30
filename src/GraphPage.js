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
    fetch('https://famichiki-backend.onrender.com/predict')
      .then(res => res.json())
      .then(data => {
        const now = GetCurrentHour();
        
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
        <div class = "graphContainer">
        <BarGraph data={predictedSales} />
        </div>
        </div>
        <div className="bottom-bar">
        <button
          className="bottom-button"
           onClick={() => navigate(-1)}
        >
          ホームに戻る
        </button>
      </div>
      </div>
  );
}

export default GraphPage;