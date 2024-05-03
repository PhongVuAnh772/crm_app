// locationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: [],
  reducers: {
    addLocation: (state, action) => {
      state.push({ address: action.payload });
    },
    updateLocation: (state, action) => {
      const { index, address } = action.payload;
      state[index].address = address;
    },
    deleteLocation: (state, action) => {
      state.splice(action.payload, 1);
    },
    resetLocations: () => [],
  },
});

export const { addLocation, updateLocation, deleteLocation, resetLocations } = locationSlice.actions;

export default locationSlice.reducer;
