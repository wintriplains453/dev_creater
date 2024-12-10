import { createSlice } from "@reduxjs/toolkit";

interface StoreData {
  count: number;
  timerActive: string;
  startGameActive: boolean;
}

const initialState: StoreData = {
  count: 0,
  timerActive: '',
  startGameActive: false
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
    },
    startingGame(state, action) {
      state.startGameActive = action.payload
    }
  }
})

export const {countChange, timerSwitch, startingGame} = storeSlice.actions
export default storeSlice.reducer