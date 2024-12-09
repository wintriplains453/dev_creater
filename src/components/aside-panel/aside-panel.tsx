import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import Selector from '../../ui/selector/selector';
import DopAsidePanel from '../dop-aside-panel/dop-aside-panel';
import { timerSwitch } from '../../store/fieldData/fieldData';

import Store from '../storeComponent/storeComponent';

import './aside_panel.scss'

const AsidePanel = () => {
  const is_storeActive = useSelector((state: RootState) => state.storeCom.active);
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [gameType, setGameType] = useState('')
  const [timer, setTimer] = useState('')

  useEffect(() => {
    dispatch(timerSwitch(timer))
  }, [timer, dispatch])
  
  return (
    <>
      <div className="AsidePanel">
        {is_storeActive ?
          <DopAsidePanel /> : null
        } 
        <h2>Панель управления</h2>
          <Selector defaultValue='clicker' setValue={setGameType} data={['clicker']}/> 
          <Store />     
          <div>
            <p>Настройка таймера</p>
            <Selector defaultValue='Убрать' setValue={setTimer} data={['Убрать', 'Индикатор']}/>
          </div>

          <p>Настройка эффектов</p>
          <p>Настройка кнопки</p>
          <button>Start</button>
      </div>    
    </>
  );
}

export default AsidePanel;