import { useState, useEffect, FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { removeStoreData } from '../../store/storeData/storeSlice';
import { RootState } from '../../store/store';
import { startingGame } from '../../store/fieldData/fieldData';

import './indicatorField.scss'

interface propsIndicator {
  indicatorType: string;
  setPopUpType: React.Dispatch<React.SetStateAction<string>> | null;
  duration: number;
}

const IndicatorField: FC<propsIndicator> = ({indicatorType, setPopUpType, duration}) => {
  const dispatch = useDispatch();
  const startGameActive = useSelector((state: RootState) => state.field.fieldData.startGameActive);

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (startGameActive && seconds < duration) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (seconds >= duration) {
      clearInterval(interval!);
      if(setPopUpType) {
        setPopUpType("EndGame")
        dispatch(removeStoreData())
      }
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

  // useEffect(() => {
  //   setDuration(timeDuration)
  // }, [duration])

  const progress = (seconds / duration) * 100;
  return (
    <div className='timerField'>
      {indicatorType === "Индикатор" ?
        <div className="Indicator">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
      : 
        indicatorType === "Таймер" ?
        <p className='taimerIndicator'>{duration - seconds}</p>
      : null
      }
    </div>
  );
}

export default IndicatorField;