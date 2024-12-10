import { FC, useState } from "react";

import DopStore from "./dop-store/dop-store";

import { IoIosArrowDropleft } from "react-icons/io";
import './dop-aside-panel.scss'

interface propsI {
  activeStoreItemId: number | null;
}

//Для разных методов главной панели 
const DopAsidePanel: FC<propsI> = ({activeStoreItemId}) => {
  const [sizePanel, setSizePanel] = useState(false)

  return (
    <div className={sizePanel === true ? "DopAsidePanelClose" : "DopAsidePanel"}>
      <IoIosArrowDropleft className="DopAsidePanelCloser" onClick={(() => setSizePanel(!sizePanel))}/>
      {sizePanel === false ?
        <DopStore activeStoreItemId ={activeStoreItemId}/> : null
      }
    </div>
  );
}

export default DopAsidePanel;