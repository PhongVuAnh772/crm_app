import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  navigatingState:false 
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    NAVIGATING_FROM_NOTIFICATION: (state,action) => {
      
      state.navigatingState = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { NAVIGATING_FROM_NOTIFICATION } = notificationSlice.actions

export default notificationSlice.reducer