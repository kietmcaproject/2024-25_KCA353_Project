// src/context/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  auth: boolean;
  email: string | null;
  username: string | null; // New field added
  userId: string | null;
}

const initialState: UserState = {
  auth: false,
  email: null,
  username: null, // Initialize username as null
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ email: string; }>) => {
      state.auth = true;
      state.email = action.payload.email;
    },
    logoutUser: (state) => {
      state.auth = false;
      state.email = null;
      state.username = null; // Clear the username on logout
      state.userId = null;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      console.log("Setting userId:", action.payload);
      state.userId = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setUsername ,setUserId} = userSlice.actions;

export default userSlice.reducer;
