import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import IndicatorField from '../../ui/indicator/indicatorField';

import AsidePanel from "../../components/aside-panel/aside-panel";
import StoreGame from "../../components/storeComponent/storeGame/storeGame";
import ClickerButton from "../../semantic/clickerButton/clicker-button";

import './home.scss'


const Home = () => {
  const dispatch = useDispatch();

  const activeStore = useSelector((state: RootState) => state.storeCom.active);
  const timerActive = useSelector((state: RootState) => state.field.fieldData.timerActive);
  const timeDuration = useSelector((state: RootState) => state.field.fieldData.timerDuration);

  const [totalCount, setTotalCount] = useState(0)
  const [indicatorType, setIndicatorType] = useState<string>("Убрать")
  const [duration, setDuration] = useState(timeDuration);

  useEffect(() => {
    setDuration(timeDuration)
  }, [timeDuration])

  return (
    <div className="HomePage">
      <div className="mainScreen">
        {timerActive === 'Индикатор' ?
          <IndicatorField duration={duration} setPopUpType={null} indicatorType={indicatorType}/> : null
        }
        {timerActive === 'Таймер' ?
          <IndicatorField duration={duration} setPopUpType={null} indicatorType={indicatorType}/> : null
        }
        <div className='wrapperCount'>{totalCount}</div>
        {activeStore === true ?
          <StoreGame setTotalCount={setTotalCount} totalCount={totalCount}/> : null
        }
        <ClickerButton setCount={setTotalCount} count={totalCount}/>
      </div>
      <AsidePanel setIndicatorType={setIndicatorType}/>
    </div>
  );
}

export default Home;
