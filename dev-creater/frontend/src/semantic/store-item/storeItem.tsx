import { FC, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { activeStoreItem, changeActive, createTitle } from '../../store/storeData/storeSlice';

import InputStoreItems from '../../ui/input/inputStoreItems';
import './storeItem.scss'

interface propsStoreItem {
  id: number;
  title: string; 
  setActiveStoreItemId: React.Dispatch<React.SetStateAction<number | null>>;
}

const StoreItem: FC<propsStoreItem> = ({id, title, setActiveStoreItemId}) => {
  const dispatch = useDispatch();

  const [titleValue, setTitleValue] = useState<string>(title)

  const openDopPanelStore = () => {
    if(titleValue.trim().length > 0) {
      dispatch(changeActive(true))
      dispatch(activeStoreItem(id))
      setActiveStoreItemId(id)
    }
  }

  const acceptTitleStoreItem = () => {
    if(titleValue.trim().length > 0) {
      dispatch(createTitle({id: id, title: titleValue}))
    }
  }

  useEffect(() => {
    if(title.length > 0) {
      acceptTitleStoreItem()
      openDopPanelStore()
    }
  }, [])

  return (
    <div className="StoreItem" onClick={openDopPanelStore}>
      <InputStoreItems text={"Придумайте Название"} value={titleValue} setValue={setTitleValue}/>
      <div>
        <button onClick={acceptTitleStoreItem}>Применить</button>
      </div>
    </div> 
  );
}

export default StoreItem;