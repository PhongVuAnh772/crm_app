// addTeamsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const addTeamsSlice = createSlice({
  name: 'addTeams',
  initialState: [],
  reducers: {
    addAddTeams: (state, action) => {
      const {index, address} = action.payload;
      const newState = {...state}; // Tạo bản sao của state

      // Kiểm tra xem index đã tồn tại chưa
      if (!newState[index]) {
        // Nếu không tồn tại, thêm một mục mới vào bản sao
        newState[index] = {address};
      }

      return newState; // Trả về bản sao mới mà không sửa đổi trạng thái gốc
    },
    updateAddTeams:(state, action) => {
      const {index, address} = action.payload;
      const newState = {...state}; // Tạo bản sao của state

      if (newState[index]) {
        const updatedItem = {...newState[index]}; // Tạo bản sao của item tại index

        if (address !== undefined) {
          updatedItem.address = address;
        }

        newState[index] = updatedItem; // Cập nhật item đã thay đổi vào newState
      }

      return newState; // Trả về state mới
    },
    deleteAddTeams: (state, action) => {
      state.splice(action.payload, 1);
    },
    resetAddTeams: () => [],
    replaceAddTeams: (state, action) => {
      return action.payload; 
    },
  },
});

export const { addAddTeams, updateAddTeams, deleteAddTeams, resetAddTeams,replaceAddTeams } = addTeamsSlice.actions;

export default addTeamsSlice.reducer;
