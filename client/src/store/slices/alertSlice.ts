// alertSlice.js
import { createSlice } from '@reduxjs/toolkit';

export interface AlertState {
  status: 'success' | 'error';
  message: string;
}

const initialState: AlertState = {
  status: 'success',
  message: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    clearAlert: (state) => {
      state.status = 'success';
      state.message = '';
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
