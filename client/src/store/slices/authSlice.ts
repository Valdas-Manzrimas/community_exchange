// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FLUSH } from 'redux-persist';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: () => initialState,
    authError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FLUSH, () => initialState);
  },
});

export const { login, logout, authError } = authSlice.actions;

export default authSlice.reducer;
