import { useState } from "react";

import DopStore from "./dop-store/dop-store";

import { IoIosArrowDropleft } from "react-icons/io";
import './dop-aside-panel.scss'

const DopAsidePanel = () => {
  const [sizePanel, setSizePanel] = useState(false)

  return (
    <div className={sizePanel === true ? "DopAsidePanelClose" : "DopAsidePanel"}>
      <IoIosArrowDropleft className="DopAsidePanelCloser" onClick={(() => setSizePanel(!sizePanel))}/>
      {sizePanel === false ?
        <DopStore /> : null
      }
    </div>
  );
}

export default DopAsidePanel;