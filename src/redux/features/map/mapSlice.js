import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../slices/message";
import PostService from "../../services/post.api.service";

export const getAllAddresses = createAsyncThunk(
  "map/Address",
  async (args, thunkAPI) => {
    // console.log(lastPostId);
    try {
      const data = await PostService.getPostAddress();
      // console.log(data);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  markerAddressHomeID: "",
  addresses: [],
  status: "idle",
  error: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    getMarkerHomeID: (state, action) => {
      state.markerAddressHomeID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAddresses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        // console.log(state.posts);
        state.status = "succeeded";
        state.addresses = action.payload;
      })
      .addCase(getAllAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getMarkerHomeID } = mapSlice.actions;
const { reducer } = mapSlice;
export default reducer;
