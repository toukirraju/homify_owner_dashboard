import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: undefined,
  user: undefined,
};

const postSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = undefined;
      state.user = undefined;
    },
    updateProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, updateProfile } = postSlice.actions;
export default postSlice.reducer;
