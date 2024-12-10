import { createSlice } from "@reduxjs/toolkit";
import {IStoreItem} from "./interface";

interface StoreData {
  active: boolean;
  title: string | null;
  storeData: IStoreItem[];
  selectedItem: IStoreItem | null;
}

const initialState: StoreData = {
  active: false,
  title: '',
  storeData: [],
  selectedItem: null,
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    changeActive(state, action) {
      state.active = action.payload
    },
    createTitle(state, action) {
      let elem = state.storeData.find(item => item.id === action.payload.id) || null;
      if(elem !== null) {
        elem.id = action.payload.id
        elem.title = action.payload.title
      }
    },
    createCount(state, action) {
      let elem = state.storeData.find(item => item.id === action.payload.id) || null;
      if(elem !== null) {
        elem.count = action.payload.count
      }
    },
    createDuration(state, action) {
      let elem = state.storeData.find(item => item.id === action.payload.id) || null;
      if(elem !== null) {
        elem.duration = action.payload.duration
      }
    },
    changeStyle(state, action) {
      let elem = state.storeData.find(item => item.id === action.payload.id) || null;
      if(elem !== null) {
        elem.style = action.payload.style
      }
    },
    createStoreData(state, action) {
      state.storeData.push(action.payload)
    },
    activeStoreItem(state, action) {
      state.selectedItem = state.storeData.find(item => item.id === action.payload) || null;
    }
  } 
})

export const {
  changeActive, createTitle, createCount, changeStyle,
  createStoreData, activeStoreItem, createDuration
} = storeSlice.actions
export default storeSlice.reducer