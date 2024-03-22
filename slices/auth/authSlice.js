import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    UPDATE_LOGIN_REQUIRED: (state) => {
      
      state.login = true
    },
    UPDATE_LOGOUT_REQUIRED: (state) => {
      
      state.login = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { UPDATE_LOGIN_REQUIRED, UPDATE_LOGOUT_REQUIRED } = authSlice.actions

export default authSlice.reducer