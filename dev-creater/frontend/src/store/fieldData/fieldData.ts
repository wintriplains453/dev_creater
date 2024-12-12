import { createSlice } from "@reduxjs/toolkit";

interface fieldData {
  fieldData: {
    count: number;
    timerActive: string;
    timerDuration: number;
    startGameActive: boolean;    
  }
}

const initialState: fieldData = {
  fieldData: {
    count: 0,
    timerActive: '',
    timerDuration: 60,
    startGameActive: false    
  }
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    countChange(state, action) {
      state.fieldData.count += action.payload
    },
    timerSwitch(state, action) {
      state.fieldData.timerActive = action.payload
    },
    timerDuration(state, action) {
      state.fieldData.timerDuration = action.payload
    },
    startingGame(state, action) {
      state.fieldData.startGameActive = action.payload
    },
    updateField(state, action) {
      state.fieldData = action.payload
    }
  }
})

export const {countChange, timerSwitch, startingGame, timerDuration, updateField} = storeSlice.actions
export default storeSlice.reducer