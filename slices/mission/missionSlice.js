import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  today: [],
  notDone: [],
  done: [],
};

export const missionSlice = createSlice({
  name: 'mission',
  initialState,
  reducers: {
    updateTodayMission: (state, action) => {
      state.today = action.payload;
    },
    updateNotDoneMission: (state, action) => {
      state.notDone = action.payload;
    },
    updateDoneMission: (state, action) => {
      state.done = action.payload;
    },
  },
});

export const { updateTodayMission, updateNotDoneMission, updateDoneMission } = missionSlice.actions;

export default missionSlice.reducer;