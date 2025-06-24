import React, { useEffect,useState } from 'react';

// 現在時刻を取得して返す関数
const fetchCurrentTime = () => {
    const date = new Date();
    const Y = date.getFullYear();
    const M = String(date.getMonth() + 1).padStart(2, '0'); 
    const D = String(date.getDate()).padStart(2, '0');
    const H = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const S = String(date.getSeconds()).padStart(2, '0');
    return `${Y}/${M}/${D} ${H}:${m}:${S}`;
};


// 現在時刻をレンダリングして返す関数
export const CurrentTime = () => {

    const [currentTime, setCurrentTime] = useState(fetchCurrentTime);
    const updateCurrentTIme = () =>{
        setCurrentTime(fetchCurrentTime);
    };

    useEffect(() => {
        const intervalId = setInterval(updateCurrentTIme, 500);
        return () => { clearInterval(intervalId); };
    },[]);
    
    return (
      <span>{ currentTime }</span>
    );
};


export const GetCurrentHour = () => {
  const date = new Date();
  return date.getHours(); 
};

export const GetCurrentTime = () => {
  const date = new Date();
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
};

