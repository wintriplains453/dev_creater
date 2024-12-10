import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { createCount, createDuration, changeStyle } from '../../../store/storeData/storeSlice';
import { IStyleStoreItem } from '../../../store/storeData/interface';

import './dop-store.scss'

interface propsI {
  activeStoreItemId : number | null;
}

const DopStore: FC<propsI> = ({activeStoreItemId }) => {
  const dispatch = useDispatch();
  const storeItems = useSelector((state: RootState) => state.storeCom.storeData);

  const currentItem = storeItems.find(item => item.id === activeStoreItemId) || null;
  const [valueI, setValueI] = useState<number | undefined>(currentItem?.count)
  const [duration, setDuration] = useState<number | undefined>(currentItem?.duration)
  const [styleState, setStyleState] = useState<IStyleStoreItem | undefined>(currentItem?.style)

  const handlerCount = (e: ChangeEvent<HTMLInputElement>, setValue: React.Dispatch<React.SetStateAction<number | undefined>>) => {
    setValue(Number(e.target.value))
  }
  const changeCount = () => {
    if(currentItem) {
      dispatch(createCount({id: currentItem.id, count: valueI, duration: duration}))
    }
  }

  const changeDuration = () => {
    if(currentItem) {
      dispatch(createDuration({id: currentItem.id, duration: duration}))
    }
  }

  const handleChangeStyle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    if (styleState && currentItem) {
      const updatedStyleState = {
        ...styleState,
        background: newColor,
      };
      setStyleState(updatedStyleState);
      dispatch(changeStyle({id: currentItem.id, style: updatedStyleState}))
    }
  }

  useEffect(() => {
    setValueI(currentItem?.count);
    setDuration(currentItem?.duration);
    setStyleState(currentItem?.style)
  }, [activeStoreItemId]);
  
  return (
    <div className="DopStore"> 
      {currentItem !== null ?
        <>
          <h3>{currentItem.title}</h3>
          <div className='fieldValueDopPanel'>
            <p>Даёт при прокачивании</p>
            <div className='fieldValueDopPanelInput'>
              <p>+</p>
              <input 
                  type='number'
                  value={valueI}
                  placeholder={currentItem?.count.toString()}
                  onChange={(e) => handlerCount(e, setValueI)}
                  min={1}
                  onBlur={changeCount}
                />               
            </div>
          </div>
          <div className='fieldValueDopPanel'>
            <p>Срабатывает каждые</p>
            <div className='fieldValueDopPanelInput'>
              <p>ms/</p>
              <input 
                type='number'
                value={duration}
                placeholder={currentItem?.duration.toString()}
                onChange={(e) => handlerCount(e, setDuration)}
                min={0}
                onBlur={changeDuration}
              />
            </div>

          </div>      
          <p>Изменить цвет</p>
          <input 
            type='color'
            value={styleState?.background}
            onChange={handleChangeStyle}
          />
          <p>Добавить рамку</p>
          <p>...</p>
          <p>Скруглить углы</p>
          <p>...</p>
          <button>Удалить</button>
        </> : null
      }
    </div>
  );
}

export default DopStore;

