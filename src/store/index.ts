import { configureStore } from '@reduxjs/toolkit'
import uiStateSlice from './uiStateSlice'

const store = configureStore ({
  reducer: {
    ui: uiStateSlice,
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
