import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnsGridType } from '../types/ui';

type uiState = {
  sideBarOpen: boolean,
  columnsGrid: ColumnsGridType
}

const uiStateSlice = createSlice({
  name: 'ui',
  initialState: {
    sideBarOpen: true,
    columnsGrid: 6,
  } as uiState,
  reducers: {
    setSideBarOpen(state, action: PayloadAction<boolean>) {
      state.sideBarOpen = action.payload
    },
    setColumnsGrid (state, action: PayloadAction<ColumnsGridType>) {
      state.columnsGrid = action.payload
    }
  }
})

export const {
  setSideBarOpen,
  setColumnsGrid,
} = uiStateSlice.actions

export default uiStateSlice.reducer
