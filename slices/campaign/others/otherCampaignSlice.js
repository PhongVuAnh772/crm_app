import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  checkinName: '',
  notificationGreeting: '',
  contentShowingQR: '',
  codeSpinning: '',
  personWinning: '',
  codeHexColor: '',
  logoPicture: null,
  backgroundPicture: null,
};

export const otherCampaignSlice = createSlice({
  name: 'otherCampaign',
  initialState,
  reducers: {
    changeCheckinName: (state, action) => {
      state.checkinName = action.payload;
    },
    changeNotificationGreeting: (state, action) => {
      state.notificationGreeting = action.payload;
    },
    changeContentShowingQR: (state, action) => {
      state.contentShowingQR = action.payload;
    },
    changeCodeSpinning: (state, action) => {
      state.codeSpinning = action.payload;
    },
    changePersonWinning: (state, action) => {
      state.personWinning = action.payload;
    },
    changeCodeHexColor: (state, action) => {
      state.codeHexColor = action.payload;
    },
    changeLogoPicture: (state, action) => {
      state.logoPicture = action.payload;
    },
    changeBackgroundPicture: (state, action) => {
      state.backgroundPicture = action.payload;
    },
  },
});

export const {
  changeCheckinName,
  changeNotificationGreeting,
  changeContentShowingQR,
  changeCodeSpinning,
  changePersonWinning,
  changeCodeHexColor,
  changeLogoPicture,
  changeBackgroundPicture,
} = otherCampaignSlice.actions;

export default otherCampaignSlice.reducer;
