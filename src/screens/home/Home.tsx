import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import AsidePanel from "../../components/aside-panel/aside-panel";
import StoreGame from "../../components/storeComponent/storeGame/storeGame";
import ClickerButton from "../../semantic/clickerButton/clicker-button";

import './home.scss'
import IndicatorField from '../../ui/indicator/indicatorField';
import { useState } from 'react';

const Home = () => {
  const activeStore = useSelector((state: RootState) => state.storeCom.active);
  const countState = useSelector((state: RootState) => state.field.count);
  const [totalCount, setTotalCount] = useState(0)
  const timerActive = useSelector((state: RootState) => state.field.timerActive);

  return (
    <div className="HomePage">
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
      <AsidePanel />
    </div>
  );
}

export default Home;
