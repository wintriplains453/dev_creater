import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { startingGame } from '../../store/fieldData/fieldData';

import StoreGame from "../../components/storeComponent/storeGame/storeGame";
import ClickerButton from "../../semantic/clickerButton/clicker-button";
import IndicatorField from '../../ui/indicator/indicatorField';

import { useCookies } from 'react-cookie';

import './game.scss'
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate()

  const [cookies] = useCookies(['paramsGame']);
  const dataGames = cookies.paramsGame.data
  
  const [indicatorType, setIndicatorType] = useState<string>(dataGames.field.timerActive)

  const [popUpType, setPopUpType] = useState("default")
  const [totalCount, setTotalCount] = useState(dataGames.field.count)
  const [duration, setDuration] = useState(dataGames.field.timerDuration);
  
  const [counter, setCounter] = useState<number>(3);

  useEffect(() => {
    setDuration(dataGames.field.timerDuration)
  }, [dataGames.field.timerDuration])

  const startGame = () => {
    dispatch(startingGame(true))
  }

  const reverseTimer = () => {
    setPopUpType("Timer")
    setCounter(3);
    const timerId = setInterval(() => {
      setCounter(prevCounter => {
        if (prevCounter === 0) {
          clearInterval(timerId);
          setPopUpType("")
          startGame()
          return prevCounter;
        }
        return prevCounter - 1;
      });
    }, 1000);
  }

  const retryGame = () => {
    setIndicatorType(dataGames.field.timerActive)
    setPopUpType("default")
    setTotalCount(0)
    setDuration(dataGames.field.timeDuration)
  }

  return (
    <div className="HomePage">
      {popUpType === "default" ?
        <>
          <div className='popup'>
            <h2>Правила игры</h2>
            <b>Задача:</b>
            <p>Ваша задача успеть за минуту собрать как можно больше очков</p>
            <b>Возможности:</b>
            <p>Для набирания очков вы можете нажимать на кликер </p>
            <p>или прокачивать в магазине автоматическое прокачивание вашего счета,</p>
            <p>это ускорит набор очков для вашего рекорда!!!</p>
            <button className='popupBtn' onClick={reverseTimer}>Старт</button>
          </div>
          <div className='blackBackground'></div>  
        </> : popUpType === "Timer" ?
        <>
          <span className={'countdown'}>{counter}</span>
          <div className='blackBackground'></div>  
        </>: popUpType === "EndGame" ?
        <>
          <div className='popup'>
            <h2>Игра окончена</h2>
            <p>Ваш счет: {totalCount}</p>
            <div className='popUpEndGameContent'>
              {/* <button className='popupBtn' onClick={retryGame}>Повторить</button> */}
              <button className='popupBtn' onClick={() => navigation('/')}>Выйти</button>              
            </div>

          </div>
          <div className='blackBackground'></div>
        </> : null
      }

      <div className="mainScreen">
        {dataGames.field.timerActive !== 'Убрать' ?
          <IndicatorField 
            duration={duration} 
            setPopUpType={setPopUpType} 
            indicatorType={indicatorType}
          /> : null
        }
        <div className='wrapperCount'>{totalCount}</div>
        {dataGames.active === true ?
          <StoreGame setTotalCount={setTotalCount} totalCount={totalCount}/> : null
        }
        <ClickerButton setCount={setTotalCount} count={totalCount}/>
      </div>
    </div>
  );
}

export default Game;