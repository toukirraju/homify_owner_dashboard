import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allRenters: [],
};

const renterSlice = createSlice({
  name: "renter",
  initialState,
  reducers: {
    getRenters: (state, action) => {
      state.allRenters = action.payload;
    },
  },
});

export const { getRenters } = renterSlice.actions;
export default renterSlice.reducer;
