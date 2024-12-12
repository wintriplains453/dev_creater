import { FC } from 'react';
import IUnit from '../../semantic/clickerButton/interface-clicker';

import './button.scss'

interface ButtonClickerProps {
  setData: React.Dispatch<React.SetStateAction<IUnit[]>> | null;
  value: string;
  data: IUnit[] | null
}

const ButtonClicker: FC<ButtonClickerProps> = ({ data, setData, value }) => {

  const handlerAddUnits = () => {
    if (setData && data) {
      const id = new Date().getUTCMilliseconds();
      setData(prevData => [...prevData, {id: id, unit:value}]);
      if(data.length === 100) {
        setData([])
      }
    }
  }
  
  return (
    <button className='buttonClicker' onClick={handlerAddUnits}>click</button>
  )
}

export default ButtonClicker;