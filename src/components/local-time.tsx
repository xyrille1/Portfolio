'use client';
import { useState, useEffect } from 'react';

export function LocalTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    };
    update();
    const timerId = setInterval(update, 1000);
    return () => clearInterval(timerId);
  }, []);

  if (!time) {
    return <span className="mono">00:00:00</span>;
  }

  return <span className="mono">{time}</span>;
}
