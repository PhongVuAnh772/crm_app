// inputSlice.js

import {createSlice} from '@reduxjs/toolkit';

const ticketAddCampaignSlice = createSlice({
  name: 'addInput',
  initialState: {},
  reducers: {
    updateAddInput: (state, action) => {
      const {index, name, price} = action.payload;
      const newState = {...state}; // Tạo bản sao của state

      if (newState[index]) {
        const updatedItem = {...newState[index]}; // Tạo bản sao của item tại index

        if (name !== undefined) {
          updatedItem.name = name;
        }
        if (price !== undefined) {
          updatedItem.price = price;
        }

        newState[index] = updatedItem; // Cập nhật item đã thay đổi vào newState
      }

      return newState; // Trả về state mới
    },
    addAddInput: (state, action) => {
  const { index, name, price } = action.payload;
  const newState = { ...state }; // Tạo bản sao của state

  // Kiểm tra xem index đã tồn tại chưa
  if (!newState[index]) {
    // Nếu không tồn tại, thêm một mục mới vào bản sao
    newState[index] = { name, price };
  }

  return newState; // Trả về bản sao mới mà không sửa đổi trạng thái gốc
},
    replaceAddInput: (state, action) => {
      return action.payload;
    },
  },
});

export const {updateAddInput, addAddInput, replaceAddInput} =
  ticketAddCampaignSlice.actions;
export default ticketAddCampaignSlice.reducer;
