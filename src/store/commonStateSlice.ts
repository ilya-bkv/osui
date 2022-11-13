import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnsGridType, Filters } from '../types/ui';
import { Nft } from '../types/nft.gen'

type State = {
  sideBarOpen: boolean,
  columnsGrid: ColumnsGridType,
  nftList: Nft[],
  filters: Filters,
}

const commonStateSlice = createSlice({
  name: 'common',
  initialState: {
    sideBarOpen: true,
    columnsGrid: 6,
    nftList: [],
    filters: {}
  } as State,
  reducers: {
    setNftList(state, action: PayloadAction<Nft[]>) {
      state.nftList = action.payload
    },
    setFilters(state, action: PayloadAction<State['filters']>) {
      state.filters = { ...state.filters, ...action.payload }
    },
    setSideBarOpen(state, action: PayloadAction<boolean>) {
      state.sideBarOpen = action.payload
    },
    setColumnsGrid (state, action: PayloadAction<ColumnsGridType>) {
      state.columnsGrid = action.payload
    }
  }
})

export const {
  setNftList,
  setFilters,
  setSideBarOpen,
  setColumnsGrid,
} = commonStateSlice.actions

export default commonStateSlice.reducer
