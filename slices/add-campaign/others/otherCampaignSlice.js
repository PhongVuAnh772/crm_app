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

export const otherAddCampaignSlice = createSlice({
  name: 'otherAddCampaign',
  initialState,
  reducers: {
    changeAddCheckinName: (state, action) => {
      state.checkinName = action.payload;
    },
    changeAddNotificationGreeting: (state, action) => {
      state.notificationGreeting = action.payload;
    },
    changeAddContentShowingQR: (state, action) => {
      state.contentShowingQR = action.payload;
    },
    changeAddCodeSpinning: (state, action) => {
      state.codeSpinning = action.payload;
    },
    changeAddPersonWinning: (state, action) => {
      state.personWinning = action.payload;
    },
    changeAddCodeHexColor: (state, action) => {
      state.codeHexColor = action.payload;
    },
    changeAddLogoPicture: (state, action) => {
      state.logoPicture = action.payload;
    },
    changeAddBackgroundPicture: (state, action) => {
      state.backgroundPicture = action.payload;
    },
  },
});

export const {
  changeAddCheckinName,
  changeAddNotificationGreeting,
  changeAddContentShowingQR,
  changeAddCodeSpinning,
  changeAddPersonWinning,
  changeAddCodeHexColor,
  changeAddLogoPicture,
  changeAddBackgroundPicture,
} = otherAddCampaignSlice.actions;

export default otherAddCampaignSlice.reducer;
