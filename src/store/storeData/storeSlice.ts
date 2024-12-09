import { createSlice } from "@reduxjs/toolkit";

interface IStoreItem {
  id: number;
  title: ''
}

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
      const elem = state.storeData.find(item => item.id === action.payload.id) || null;
      if(elem !== null) {
        elem.title = action.payload.title
      }
    },
    createStoreData(state, action) {
      state.storeData.push(action.payload)
    },
    activeStoreItem(state, action) {
      console.log(state.storeData)
      state.selectedItem = state.storeData.find(item => item.id === action.payload) || null;
    }
  } 
})

export const {changeActive, createTitle, createStoreData, activeStoreItem} = storeSlice.actions
export default storeSlice.reducer