import { configureStore } from '@reduxjs/toolkit'
import networkReducer from '../slices/network/networkSlice'
import authReducer from '../slices/auth/authSlice'
import missionReducer from '../slices/mission/missionSlice'
import userReducer from '../slices/users/userSlice'
export const store = configureStore({
  reducer: {
    network: networkReducer,
    auth: authReducer,
    mission: missionReducer,
    user: userReducer
  },
  
})