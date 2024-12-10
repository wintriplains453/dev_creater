import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { startingGame } from '../../store/fieldData/fieldData';

import './indicatorField.scss'

const IndicatorField = () => {
  const dispatch = useDispatch();
  const startGameActive = useSelector((state: RootState) => state.field.startGameActive);

  const [seconds, setSeconds] = useState(0);
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (startGameActive && seconds < duration) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (seconds >= duration) {
      clearInterval(interval!);
      dispatch(startingGame(false))
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [startGameActive, seconds, duration]);

  useEffect(() => {
    if(startGameActive === true) {
      dispatch(startingGame(true))
      setSeconds(0);      
    }
  }, [startGameActive])

  const progress = (seconds / duration) * 100;
  return (
      <div className="timerIndicator">
        {/* <p>{duration - seconds} секунд осталось</p> */}
        <div className="progress" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default IndicatorField;