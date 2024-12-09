import { createSlice } from "@reduxjs/toolkit";

interface StoreData {
  count: number;
  timerActive: string;
}

const initialState: StoreData = {
  count: 0,
  timerActive: ''
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    countChange(state, action) {
      state.count += action.payload
    },
    timerSwitch(state, action) {
      state.timerActive = action.payload
    }
  }
})

export const {countChange, timerSwitch} = storeSlice.actions
export default storeSlice.reducer