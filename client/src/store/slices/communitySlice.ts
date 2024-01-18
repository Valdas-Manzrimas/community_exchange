import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Community {
  id: string;
  pictures?: string[];
  name?: string;
  description?: string;
  members?: string[];
  posts?: string[];
  moderator?: string;
  users?: string[];
}

const initialState: Community = {
  id: '',
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setCommunity: (_, action: PayloadAction<Community>) => {
      return action.payload;
    },
    clearCommunity: () => initialState,
  },
});

export const { setCommunity, clearCommunity } = communitySlice.actions;
export default communitySlice.reducer;
