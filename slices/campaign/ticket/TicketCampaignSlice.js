// inputSlice.js

import { createSlice } from '@reduxjs/toolkit';

const ticketCampaignSlice = createSlice({
  name: 'input',
  initialState: {},
  reducers: {
    updateInput: (state, action) => {
      const { index, name, price } = action.payload;
      if (state[index]) {
        if (name !== undefined) {
          state[index].name = name;
        }
        if (price !== undefined) {
          state[index].price = price;
        }
      }
    },
    addInput(state, action) {
      const { index, name, price } = action.payload;
      state[index] = { name, price };
    },
  },
});

export const { updateInput, addInput } = ticketCampaignSlice.actions;
export default ticketCampaignSlice.reducer;
