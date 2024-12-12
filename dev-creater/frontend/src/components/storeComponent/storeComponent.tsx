import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { changeActive, createStoreData, updateStoreData } from '../../store/storeData/storeSlice';
import { useCookies } from 'react-cookie';

import StoreItem from '../../semantic/store-item/storeItem';
import { IStoreItem } from '../../store/storeData/interface';

import { IoAddSharp } from "react-icons/io5";
import './store.scss'
import { startingGame, timerDuration, timerSwitch, updateField } from '../../store/fieldData/fieldData';

interface propsData {
  setActiveStoreItemId: React.Dispatch<React.SetStateAction<number | null>>;
}

const Store: FC<propsData> = ({setActiveStoreItemId}) => {
  const [cookies] = useCookies(['paramsGame']);
  const dataGames = cookies.paramsGame?.data
  const dispatch = useDispatch();

  const [storeElem, setStoreElem] = useState<{id: number, title: string}[]>(dataGames?.store ? dataGames?.store : [])
  const [activeStore, setActiveStore] = useState<boolean>(dataGames?.active ? dataGames?.active : false)

  const addStoreFunction = () => {
    setStoreElem((prev) => [...prev, {id: prev.length, title: ""}])
    dispatch(createStoreData({
      id: storeElem.length,
      title: "",
      count: 1,
      duration: 1000,
      level: 0,
      style: {
        background: '#EEEEEE',
        borderRadius: 0,
        border: 'none'
      }
    }))
  }

  const switchActiveStore = (e: ChangeEvent<HTMLInputElement>) => {
    setActiveStore(e.target.checked)
    dispatch(changeActive(false))
  }

  useEffect(() => {
    if(dataGames) {
      dispatch(updateStoreData(dataGames.store))
    }
  }, [])

  return (
    <div className="Store"> 
      <div className='storeActivate'>
        <input 
          type='checkbox' 
          checked={activeStore} 
          id='addStore'
          onChange={(e) => switchActiveStore(e)}
        />
        <label htmlFor='addStore'>Добавить магазин</label>        
      </div>
      <div className='addStore'>
        <div className='storeScroll'>
          {activeStore ? 
            <>
              {storeElem.map(item => (
                <StoreItem 
                  key={item.id} 
                  id={item.id} 
                  title={item.title}
                  setActiveStoreItemId={setActiveStoreItemId}/>
              ))}        
            </> : null
          }          
        </div>
        {activeStore ? <IoAddSharp onClick={addStoreFunction} /> : null}
      </div>
    </div>
  );
}

export default Store;