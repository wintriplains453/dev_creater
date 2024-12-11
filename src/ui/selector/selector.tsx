import { ChangeEvent, FC } from 'react';

import { useDispatch } from 'react-redux';
import { timerSwitch } from '../../store/fieldData/fieldData';

import './selector.scss'

interface PropsSelector {
  defaultValue: string;
  data: string[];
  setValue: (value: string) => void;
  selected: React.Dispatch<React.SetStateAction<string>>;
}

const Selector: FC<PropsSelector> = ({defaultValue, data, setValue, selected}) => {
  const dispatch = useDispatch();
  
  const selectet = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
    selected(e.target.value)
    dispatch(timerSwitch(e.target.value))
  }

  return (
    <select 
      className="Selector" 
      onChange={selectet}
    >
      {data.map((item, index) => (
        <option 
          key={index} 
          defaultValue={defaultValue}
        >{item}</option>     
      ))}
    </select>
  );
}

export default Selector;