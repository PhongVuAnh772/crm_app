import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ipv4: 'https://crm.phoenixcamp.vn/apis',
  formWeb: 'https://crm.zikii.vn'
}

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    CHANGE_NETWORK: (state,action) => {
      
      state.ipv4 = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { CHANGE_NETWORK } = networkSlice.actions

export default networkSlice.reducer