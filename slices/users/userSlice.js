import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: [],
  introducingAgent: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    UPDATE_USER_DATA: (state, action) => {
      state.user = action.payload;
    },
    CLEAR_USER_DATA: (state) => {
      state.user = [];
    },
    UPDATE_USER_INTRODUCING_AGENT: (state, action) => {
      state.introducingAgent = action.payload;
    },
    CLEAR_USER_INTRODUCING_AGENT: (state) => {
      state.introducingAgent = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const {UPDATE_USER_DATA,CLEAR_USER_DATA,UPDATE_USER_INTRODUCING_AGENT,CLEAR_USER_INTRODUCING_AGENT} = userSlice.actions

export default userSlice.reducer