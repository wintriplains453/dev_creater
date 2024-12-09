import { FC } from 'react';
import './selector.scss'

interface PropsSelector {
  defaultValue: string;
  data: string[];
  setValue: (value: string) => void;
}

const Selector: FC<PropsSelector> = ({defaultValue, data, setValue}) => {
  
  return (
    <select 
      className="Selector" 
      onChange={(e) => setValue(e.target.value)}
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