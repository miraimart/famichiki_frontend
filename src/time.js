import React, { useEffect,useState } from 'react';

// 現在時刻を取得して返す関数
const fetchCurrentTime = () => {
    const date = new Date(); // ← これが必要です
    const Y = date.getFullYear();
    const M = String(date.getMonth() + 1).padStart(2, '0'); // 月は0始まりなので+1
    const D = String(date.getDate()).padStart(2, '0');
    const H = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const S = String(date.getSeconds()).padStart(2, '0');
    return `${Y}/${M}/${D} ${H}:${m}:${S}`;
};


// 現在時刻をレンダリングして返す関数
export const CurrentTime = () => {

    // 現在時刻管理のuseStateを定義
    const [currentTime, setCurrentTime] = useState(fetchCurrentTime);
    const updateCurrentTIme = () =>{
        setCurrentTime(fetchCurrentTime);
    };

    // 初回レンダリング時にのみ、実行
    useEffect(() => {
        // 0.5秒間隔でuseState更新
        const intervalId = setInterval(updateCurrentTIme, 500);
        // クリーンナップ関数（コンポーネント削除時に実行)
        return () => { clearInterval(intervalId); };
    },[]);
    
    return (
      <span>{ currentTime }</span>
    );
};

// 時間（hour）だけ返すヘルパー関数
export const GetCurrentHour = () => {
  const date = new Date();
  return date.getHours(); // 0〜23の数値
};

