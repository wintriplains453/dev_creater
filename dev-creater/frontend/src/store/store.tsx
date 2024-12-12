import { configureStore } from '@reduxjs/toolkit'
import storeReducer from './storeData/storeSlice'
import fieldReducer from './fieldData/fieldData'

export const store = configureStore({
  reducer: {
    storeCom: storeReducer,
    field: fieldReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch