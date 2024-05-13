import { createSlice } from '@reduxjs/toolkit';

const listCampaignSlice = createSlice({
  name: 'listCampaign',
  initialState: {
    info: []
  },
  reducers: {
    CHANGE_VALUE_LIST: (state, action) => {
      state.info = action.payload;
    },
    DELETE_ALL_VALUES_LIST: (state) => {
      state.info = [];
    },
  },
});

export const { CHANGE_VALUE_LIST, DELETE_ALL_VALUES_LIST } = listCampaignSlice.actions;
export default listCampaignSlice.reducer;