import { createSlice } from '@reduxjs/toolkit';
import { Nft } from '../types/nft.gen'


const nftsSlice = createSlice({
  name: 'nfts',
  initialState: {
    nftList: []
  },
  reducers: {
    setEthPublicAddress(state, action) {
      state.nftList = action.payload
    },
  }
})

export const {
  setEthPublicAddress,
} = nftsSlice.actions

export default nftsSlice.reducer
