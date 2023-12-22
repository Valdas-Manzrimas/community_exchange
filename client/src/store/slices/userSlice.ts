// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles?: [string];
  communities?: [string];
}

const initialState: User = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  roles: ['ROLE_USER'],
  communities: [''],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
