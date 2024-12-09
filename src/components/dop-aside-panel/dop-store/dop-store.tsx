import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import './dop-store.scss'

const DopStore = () => {
  const selectedItem = useSelector((state: RootState) => state.storeCom.selectedItem);

  return (
    <div className="DopStore">
      {selectedItem !== null ?
        <>
          <h3>{selectedItem.title}</h3>
          <div>
            <p>Даёт при прокачивании</p>
            <label>+1</label>
            <input type='radio' name='pointCreate' value={'+1'}/>        
            </div>
            <div>
            <label>+10</label>
            <input type='radio' name='pointCreate'/>        
            </div>
            <div>
            <label>+100</label>
            <input type='radio' name='pointCreate'/>        
          </div>      
          <p>Изменить цвет</p>
          <input type='color'/>
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

