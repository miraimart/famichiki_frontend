import './App.css';
import logo from './imgaes/mart_green.png';
import React, { useEffect, useState } from 'react';
import { CurrentTime, GetCurrentHour } from './time';
import { useNavigate } from 'react-router-dom'; 
import { GetCurrentTime } from './time';

import Snackbar from '@mui/material/Snackbar';
import ClearIcon from "@mui/icons-material/Clear";


function App() {
  const [predictedSales, setPredictedSales] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(GetCurrentTime());

  const navigate = useNavigate(); 
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
  if (currentTime.hour === 11 && currentTime.minute === 30 && currentTime.second === 0) {
    setOpen(true);
  } 
}, [currentTime]);

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(GetCurrentTime());
      }, 1000); // 1分ごとに更新

      return () => clearInterval(timer);
    }, []);

  useEffect(() => {
  fetch('https://') 
    .then(res => res.json())
    .then(data => {
      const now = GetCurrentHour()
      const targetHours = Array.from({ length: 6 }, (_, i) => (now + i) % 24);

      const filtered = data.predictions
        ? data.predictions.filter(item => {
            const hourNum = parseInt(item.hour, 10);
            return targetHours.includes(hourNum);
          })
        : [];
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
          <h3>
          {predictedSales.length > 0
            ? predictedSales.map((item, i) => (
                <div key={i}>
                  {item.hour}時の予測: {item.predicted_sales} 個
                </div>
              ))
            : "データ取得中..."}
            </h3>
        </div>
      </div>
      <div className="bottom-bar">
        <button
          className="bottom-button"
          onClick={() => navigate('/next')}
        >
          ボタン
        </button>
        {open && (
           <Snackbar
            open={open}
            message={
              <span className="custom-snackbar-message">ピークが予測されます</span>
            }
            onClose={handleClose}
            action={<ClearIcon onClick={handleClose} />}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
                )}

      </div>
    </div>
  );
}

export default App;

