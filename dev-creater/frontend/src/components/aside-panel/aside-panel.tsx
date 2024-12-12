import { FC, useContext, useEffect, useState } from 'react';

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { timerDuration, timerSwitch } from '../../store/fieldData/fieldData';
import { RootState } from '../../store/store';

import PopUpCompany from '../../ui/popup/popUpCompany';
import PopUpRegister from '../../ui/popup/popUpRegister';
import PopUpLogin from '../../ui/popup/popUpLogin';

import Selector from '../../ui/selector/selector';
import DopAsidePanel from '../dop-aside-panel/dop-aside-panel';

import Store from '../storeComponent/storeComponent';

import './aside_panel.scss'


interface propsAsidePanel {
  setIndicatorType: React.Dispatch<React.SetStateAction<string>>;
}

const AsidePanel: FC<propsAsidePanel> = ({setIndicatorType}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['paramsGame']);
  const dataGames = cookies.paramsGame?.data

  const is_storeActive = useSelector((state: RootState) => state.storeCom.active);
  const timeDuration = useSelector((state: RootState) => state.field.fieldData.timerDuration);
  const storeData = useSelector((state: RootState) => state.storeCom.storeData);
  const active = useSelector((state: RootState) => state.storeCom.active);
  const fieldData = useSelector((state: RootState) => state.field.fieldData);

  const [activeStoreItemId, setActiveStoreItemId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<string>("")

  // eslint-disable-next-line
  const [gameType, setGameType] = useState('')
  const [selectTimerType, setSelectTimerType] = useState('Убрать')
  const [selectTimer, setSelectTimer] = useState<number>(timeDuration)

  const [popUp, setPopUp] = useState("default")
  const [company_id, setCompanyId] = useState("")

  useEffect(() => {
    setIndicatorType(selectedItem)
  }, [selectedItem])

  useEffect(() => {
    dispatch(timerSwitch(selectTimerType))
  }, [selectTimerType, dispatch])

  useEffect(() => {
    dispatch(timerDuration(selectTimer))
  }, [selectTimer])

  const startGame = () => {
    setCookie("paramsGame", {
      data: {
        store: storeData,
        field: fieldData,
        active: active,
      }
    })
    navigate('/game');
  }

  useEffect(() => {
    if(dataGames) {
      setSelectTimerType(dataGames.field.timerActive)
      setSelectTimer(dataGames.field.timerDuration)
    }
  }, [])

  const saveGame = () => {
    setCookie("paramsGame", {
      data: {
        store: storeData,
        field: fieldData,
        active: active,
      }
    })
  }
  
  
  return (
    <> 
      {popUp === "company" ?
        <>
          <PopUpCompany setPopUp={setPopUp} setCompanyId={setCompanyId}/>
          <div className='blackBackground' onClick={() => setPopUp("default")}></div>  
        </> : popUp === "register" ?
        <>
          <PopUpRegister setPopUp={setPopUp} company_id={company_id}/>
          <div className='blackBackground' onClick={() => setPopUp("default")}></div>  
        </> : popUp === "login" ?
        <>
          <PopUpLogin setPopUp={setPopUp}/>
          <div className='blackBackground' onClick={() => setPopUp("default")}></div>  
        </> : null
      }
      <div className="AsidePanel">

        <div className='asidePanelContent'>
          {is_storeActive ?
            <DopAsidePanel activeStoreItemId={activeStoreItemId}/> : null
          } 
          <h2>Панель управления</h2>
          <div className='wrapperAuth'>
            <button onClick={() => setPopUp("company")}>Регестрация</button>
            <button onClick={() => setPopUp("login")}>Войти</button>
          </div>
          <Selector 
            defaultValue='clicker' 
            selected={setSelectedItem}
            setValue={setGameType} 
            data={['clicker']}
          /> 
          <Store setActiveStoreItemId={setActiveStoreItemId}/>     
          <div className='settingsTimer'>
            <p>Настройка таймера</p>
            <Selector 
              defaultValue='Убрать' 
              selected={setSelectedItem} 
              setValue={setSelectTimerType} 
              data={['Убрать', 'Индикатор', 'Таймер']}
            />
            {selectTimerType !== "Убрать" ?
              <div className='timerSettingsInput'>
                <input 
                  type='number'
                  value={selectTimer}
                  onChange={(e) => setSelectTimer(+e.target.value)}
                />
              </div>: null
            }

          </div>

          <p>Настройка эффектов</p>
          <p>Настройка кнопки</p>          
        </div>
        <div className='asideControlButton'>
          <button className='btn' onClick={saveGame}>Save</button>
          <button className='btn' onClick={startGame}>Start</button>
        </div>
      </div>    
    </>
  );
}

export default AsidePanel;