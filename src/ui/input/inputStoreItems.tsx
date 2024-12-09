import { FC } from 'react';
import './input.scss'

interface IPropsInput {
  text: String;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputStoreItems: FC<IPropsInput> = ({text, value, setValue}) => {
  return (
    <div className='InputStoreItems'>
      <label>{text}</label>
      <input 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default InputStoreItems;