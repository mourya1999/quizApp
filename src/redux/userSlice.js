import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',  
  data: {},  
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeToken: (state, action) => {
      state.token = action.payload; 
    },
    storeLoginRes: (state, action) => {
      state.data = action.payload;  
    },
    clearAuth: (state) => {
      state.token = '';  
      state.data = {};   
    },
  },
});

export const { storeToken, storeLoginRes, clearAuth } = authSlice.actions;

export default authSlice.reducer;
