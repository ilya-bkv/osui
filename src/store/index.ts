import { configureStore } from '@reduxjs/toolkit'
import commonStateSlice from './commonStateSlice'

const store = configureStore ({
  reducer: {
    common: commonStateSlice,
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
