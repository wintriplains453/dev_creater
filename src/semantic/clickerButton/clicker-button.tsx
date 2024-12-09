
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { countChange } from "../../store/fieldData/fieldData";

import ButtonClicker from "../../ui/button/buttonClicker";

import IUnit from "./interface-clicker";

import './clicker-button.scss'

const ClickerButton = () => {
  const dispatch = useDispatch();

  const [units, setUnits] = useState<IUnit[]>([]);


  useEffect(() => {
    if(units.length > 0) {
      dispatch(countChange(1))
    }
    // eslint-disable-next-line
  }, [units])

  return (
    <div>
      <div className="clickerUnitsWrapper">
        {units.map((item, index) => (
          <div 
            key={index}
            className="clickerUnits"
          >
            {index}
          </div>
        ))}        
      </div>
      <ButtonClicker 
        setData={setUnits}
        value=""
        data={units}
      />
    </div>
  );
}

export default ClickerButton;