import { ChangeEvent, FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { changeActive, createStoreData } from '../../store/storeData/storeSlice';

import StoreItem from '../../semantic/store-item/storeItem';

import { IoAddSharp } from "react-icons/io5";
import './store.scss'

interface propsData {
  setActiveStoreItemId: React.Dispatch<React.SetStateAction<number | null>>;
}

const Store: FC<propsData> = ({setActiveStoreItemId}) => {
  const dispatch = useDispatch();

  const [storeElem, setStoreElem] = useState<{id: number}[]>([])
  const [activeStore, setActiveStore] = useState<boolean>(false)

  const addStoreFunction = () => {
    setStoreElem((prev) => [...prev, {id: prev.length}])
    dispatch(createStoreData({
      id: storeElem.length,
      title: "",
      count: 1,
      duration: 1000,
      level: 0,
      style: {
        background: '#909090',
        borderRadius: 0,
        border: 'none'
      }
    }))
  }

  const switchActiveStore = (e: ChangeEvent<HTMLInputElement>) => {
    setActiveStore(e.target.checked)
    dispatch(changeActive(false))
  }

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
                  <StoreItem key={item.id} id={item.id} setActiveStoreItemId={setActiveStoreItemId}/>
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