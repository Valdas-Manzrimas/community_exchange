// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles?: [string];
  communities?: [string];
  phone?: number;
  city?: string;
  country?: string;
}

const initialState: User = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  roles: ['ROLE_USER'],
  communities: [''],
  phone: 0,
  city: '',
  country: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
