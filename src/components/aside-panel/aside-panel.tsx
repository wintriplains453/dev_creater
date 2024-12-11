import { FC, useContext, useEffect, useState } from 'react';

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { timerDuration, timerSwitch } from '../../store/fieldData/fieldData';
import { RootState } from '../../store/store';

import AuthContext from '../../context/AuthContext';

import Selector from '../../ui/selector/selector';
import DopAsidePanel from '../dop-aside-panel/dop-aside-panel';

import Store from '../storeComponent/storeComponent';

import './aside_panel.scss'
import PopUpCompany from '../../ui/popup/popUpCompany';
import PopUpRegister from '../../ui/popup/popUpRegister';

interface propsAsidePanel {
  setIndicatorType: React.Dispatch<React.SetStateAction<string>>;
}

const AsidePanel: FC<propsAsidePanel> = ({setIndicatorType}) => {
  
  const [cookies, setCookie] = useCookies(['paramsGame']);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const saveGame = () => {
    setCookie("paramsGame", {
      data: {
        store: storeData,
        field: fieldData,
        active: active,
      }
    })
    setPopUp("company")
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
        </> : null
      }
      <div className="AsidePanel">

        <div className='asidePanelContent'>
          {is_storeActive ?
            <DopAsidePanel activeStoreItemId={activeStoreItemId}/> : null
          } 
          <h2>Панель управления</h2>
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