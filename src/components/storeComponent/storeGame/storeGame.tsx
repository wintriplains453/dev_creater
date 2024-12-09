import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import './storeGame.scss'

const StoreGame = () => {
  const storeData = useSelector((state: RootState) => state.storeCom.storeData);

  return (
    <div className="StoreGame">
      <h2>Магазин улучшений</h2>
      {storeData.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
    </div>
  );
}

export default StoreGame;