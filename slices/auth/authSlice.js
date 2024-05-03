import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: false,
  token: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    UPDATE_LOGIN_REQUIRED: (state) => {
      
      state.login = true
    },
    UPDATE_LOGOUT_REQUIRED: (state) => {
      state.token = ""
      state.login = false
    },
    UPDATE_TOKEN_REQUIRED: (state, action) => {
      state.token = action.payload; // Cập nhật token từ payload
      state.login = true; // Đặt login thành true khi có token
    }
  },
})

// Action creators are generated for each case reducer function
export const { UPDATE_LOGIN_REQUIRED, UPDATE_LOGOUT_REQUIRED ,UPDATE_TOKEN_REQUIRED} = authSlice.actions

export default authSlice.reducer