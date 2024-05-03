import {configureStore} from '@reduxjs/toolkit';
import networkReducer from '../slices/network/networkSlice';
import authReducer from '../slices/auth/authSlice';
import missionReducer from '../slices/mission/missionSlice';
import userReducer from '../slices/users/userSlice';
import TicketCampaignReducer from '../slices/campaign/ticket/TicketCampaignSlice';
import LocationSlice from '../slices/campaign/location/LocationSlice';
import otherCampaignReducer from '../slices/campaign/others/otherCampaignSlice';
import AddLocationReducer from '../slices/add-campaign/location/AddLocationSlice';
import AddTicketCampaignReducer from '../slices/add-campaign/ticket/TicketCampaignSlice';
import addOtherCampaignReducer from '../slices/add-campaign/others/otherCampaignSlice';
export const store = configureStore({
  reducer: {
    network: networkReducer,
    auth: authReducer,
    mission: missionReducer,
    user: userReducer,
    ticket: TicketCampaignReducer,
    location: LocationSlice,
    otherCampaign: otherCampaignReducer,
    addTicket: AddTicketCampaignReducer,
    addLocation: AddLocationReducer,
    addOtherCampaign: addOtherCampaignReducer, 
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {
        warnAfter: 64,
      },
    }),
});
