import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { startingGame } from '../../store/fieldData/fieldData';

import StoreGame from "../../components/storeComponent/storeGame/storeGame";
import ClickerButton from "../../semantic/clickerButton/clicker-button";

import './game.scss'
import IndicatorField from '../../ui/indicator/indicatorField';

const Game = () => {
  const dispatch = useDispatch();

  const activeStore = useSelector((state: RootState) => state.storeCom.active);
  const countState = useSelector((state: RootState) => state.field.count);
  const timerActive = useSelector((state: RootState) => state.field.timerActive);

  const [popup, setPopup] = useState(true)
  const [totalCount, setTotalCount] = useState(countState)

  const startGame = () => {
    dispatch(startingGame(true))
    setPopup(false)
  }

  return (
    <div className="HomePage">
      {popup ?
        <>
          <div className='popup'>
            <button onClick={startGame}>Старт</button>
          </div>
          <div className='blackBackground'></div>  
        </> : null
      }

      <div className="mainScreen">
        {timerActive === 'Индикатор' ?
          <IndicatorField /> : null
        }
        <div className='wrapperCount'>{totalCount}</div>
        {activeStore === true ?
          <StoreGame setTotalCount={setTotalCount} totalCount={totalCount}/> : null
        }
        <ClickerButton setCount={setTotalCount} count={totalCount}/>
      </div>
    </div>
  );
}

export default Game;