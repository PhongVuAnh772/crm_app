// teamSlice.js

import { createSlice } from '@reduxjs/toolkit';

const teamSlice = createSlice({
  name: 'team',
  initialState: [],
  reducers: {
    addTeams: (state, action) => {
      state.push({ address: action.payload });
    },
    updateTeams: (state, action) => {
      const { index, address } = action.payload;
      state[index].address = address;
    },
    deleteTeams: (state, action) => {
      state.splice(action.payload, 1);
    },
    resetTeamss: () => [],
  },
});

export const { addTeams, updateTeams, deleteTeams, resetTeams } = teamSlice.actions;

export default teamSlice.reducer;
