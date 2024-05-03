// addLocationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const addLocationSlice = createSlice({
  name: 'addLocation',
  initialState: [],
  reducers: {
    addAddLocation: (state, action) => {
      const {index, address} = action.payload;
      const newState = {...state}; // Tạo bản sao của state

      // Kiểm tra xem index đã tồn tại chưa
      if (!newState[index]) {
        // Nếu không tồn tại, thêm một mục mới vào bản sao
        newState[index] = {address};
      }

      return newState; // Trả về bản sao mới mà không sửa đổi trạng thái gốc
    },
    updateAddLocation:(state, action) => {
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
    deleteAddLocation: (state, action) => {
      state.splice(action.payload, 1);
    },
    resetAddLocations: () => [],
    replaceAddLocations: (state, action) => {
      return action.payload; 
    },
  },
});

export const { addAddLocation, updateAddLocation, deleteAddLocation, resetAddLocations,replaceAddLocations } = addLocationSlice.actions;

export default addLocationSlice.reducer;
