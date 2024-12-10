import { FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { activeStoreItem, changeActive, createTitle } from '../../store/storeData/storeSlice';

import InputStoreItems from '../../ui/input/inputStoreItems';
import './storeItem.scss'

interface propsStoreItem {
  id: number;
  setActiveStoreItemId: React.Dispatch<React.SetStateAction<number | null>>;
}

const StoreItem: FC<propsStoreItem> = ({id, setActiveStoreItemId}) => {
  const dispatch = useDispatch();

  const [titleValue, setTitleValue] = useState('')

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