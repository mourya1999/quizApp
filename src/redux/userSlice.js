import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',  
  data: {},  
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeLoginRes: (state, action) => {
      state.data = action.payload;  
    },
    clearAuth: (state) => {
      state.token = '';  
      state.data = {};   
    },
  },
});

export const { storeLoginRes, clearAuth } = userSlice.actions;

export default userSlice.reducer;
