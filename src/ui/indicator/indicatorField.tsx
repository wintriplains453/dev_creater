import { useState, useEffect } from 'react';
import './indicatorField.scss'

const IndicatorField = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds < duration) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (seconds >= duration) {
      clearInterval(interval!);
      setIsActive(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, seconds, duration]);

  const handleStart = () => {
    setIsActive(true);
    setSeconds(0);
  };

  const progress = (seconds / duration) * 100;
  return (
      <div className="timerIndicator">
        {/* <p>{duration - seconds} секунд осталось</p> */}
        <div className="progress" style={{ width: `${progress}%` }} />
      <button onClick={handleStart}>Запустить</button>
    </div>
  );
}

export default IndicatorField;