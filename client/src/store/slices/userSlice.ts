// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: [string];
}

const initialState: User = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  roles: ['ROLE_USER'],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      Object.assign(state, action.payload);
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
