import { FC, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import {IStoreItem} from '../../../store/storeData/interface';

import { FaLongArrowAltUp } from "react-icons/fa";
import './storeGame.scss'

interface propsStoreGame {
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number
}

const StoreGame: FC<propsStoreGame> = ({setTotalCount, totalCount}) => {
  
  const storeData = useSelector((state: RootState) => state.storeCom.storeData);
  const [storeDataState, setStoreDataState] = useState<IStoreItem[]>(storeData)

  const updateLevel = (item: IStoreItem, index: number) => {
    
    if(totalCount >= +item.count) {

      setStoreDataState((prevStoreData) => {
        return prevStoreData.map((prevItem, prevIndex) => {
          if (prevIndex === index) {
            return { ...prevItem, level: prevItem.level + 1 };
          }
          return prevItem;
        })
      })
      setTotalCount(totalCount - item.count)
    }
  }

  useEffect(() => {
    setStoreDataState(storeData)
    console.log(storeData)
  }, [storeData])

  useEffect(() => {
    const intervalIds: ReturnType<typeof setInterval>[] = [];

    storeDataState.forEach(item => {
      if (item.level > 0) {
        const intervalId = setInterval(() => {
          setTotalCount((prevTotalCount) => prevTotalCount + (item.count*item.level));
        }, item.duration);

        intervalIds.push(intervalId);
      }
    });

    return () => {
      intervalIds.forEach(clearInterval);
    };
  }, [storeDataState]);

  return (
    <div className="StoreGame">
      <h2>Магазин улучшений</h2>
      <div className='StoreGameScroll'>
        {storeDataState.map((item, index) => (
          <div key={index} className='wrapperStoreItem' style={{background: item.style.background}}>
            <div className='levelStoreItem'>LV{item.level}</div>
            <div className='wrapperContentStoreItem'>
              <div className='contentStoreItem'>
                <h4>{item.title}</h4>
                <p>+{+(item.count)*item.level}/ms</p>
              </div>
              <div className='wrapperBtnStoreItem'>
                <button onClick={() => updateLevel(item, index)} className='btnStoreItem'>
                  <p>+{item.count}/ms</p>
                </button>
                {totalCount >= +item.count ?
                  <FaLongArrowAltUp /> : null
                }             
              </div>
            </div>
          </div>
        ))}        
      </div>

    </div>
  );
}

export default StoreGame;