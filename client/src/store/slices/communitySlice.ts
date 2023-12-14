import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Community {
  id: string;
}

const initialState: Community = {
  id: '',
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setCommunity: (state, action: PayloadAction<Community>) => {
      return action.payload;
    },
    clearCommunity: () => initialState,
  },
});

export const { setCommunity, clearCommunity } = communitySlice.actions;
export default communitySlice.reducer;
