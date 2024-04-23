import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultHouse: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setDefaultHouse: (state, action) => {
      state.defaultHouse = action.payload;
    },
  },
});

export const { setDefaultHouse } = profileSlice.actions;
export default profileSlice.reducer;
