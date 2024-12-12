import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import IndicatorField from '../../ui/indicator/indicatorField';

import { useCookies } from 'react-cookie';

import AsidePanel from "../../components/aside-panel/aside-panel";
import StoreGame from "../../components/storeComponent/storeGame/storeGame";
import ClickerButton from "../../semantic/clickerButton/clicker-button";

import './home.scss'


const Home = () => {
  const [cookies] = useCookies(['paramsGame']);
  const dataGames = cookies.paramsGame?.data

  const activeStore = useSelector((state: RootState) => state.storeCom.active);
  const timerStoreActive = useSelector((state: RootState) => state.field.fieldData.timerActive);
  const timeDuration = useSelector((state: RootState) => state.field.fieldData.timerDuration);

  const [totalCount, setTotalCount] = useState(0)
  const [indicatorType, setIndicatorType] = useState<string>("Убрать")
  const [duration, setDuration] = useState(timeDuration);
  const [timerActive, setTimerActive] = useState(timerStoreActive)

  useEffect(() => {
    setDuration(timeDuration)
  }, [timeDuration])

  useEffect(() => {
    if(dataGames) {
      setTimerActive(dataGames.field.timerActive)
      setIndicatorType(dataGames.field.timerActive)
      setDuration(dataGames.field.timerDuration)
    }
  }, [])

  useEffect(() => {
    console.log(indicatorType)
  }, [indicatorType])

  return (
    <div className="HomePage">
      <div className="mainScreen">
        {indicatorType === 'Индикатор' ?
          <IndicatorField duration={duration} setPopUpType={null} indicatorType={indicatorType}/> : null
        }
        {indicatorType === 'Таймер' ?
          <IndicatorField duration={duration} setPopUpType={null} indicatorType={indicatorType}/> : null
        }
        <div className='wrapperCount'>{totalCount}</div>
        <ClickerButton setCount={setTotalCount} count={totalCount}/>
        {activeStore === true ?
          <StoreGame setTotalCount={setTotalCount} totalCount={totalCount}/> : null
        }
      </div>
      <AsidePanel setIndicatorType={setIndicatorType}/>
    </div>
  );
}

export default Home;
