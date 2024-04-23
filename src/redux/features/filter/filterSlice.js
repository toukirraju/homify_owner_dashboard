import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findManager, findRenter } from "./thunkApi";
import { setMessage } from "../../slices/message";

const initialState = {
  isLoading: false,
  isError: false,
  renterSearchId: "",
  renter: {},
  manager: {},
  filterByFloor: "",
};

export const searchRenter = createAsyncThunk(
  "filter/findrenter",
  async (renterId, thunkAPI) => {
    try {
      const data = await findRenter(renterId);
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

export const searchManager = createAsyncThunk(
  "filter/findManager",
  async (searchId, thunkAPI) => {
    try {
      const data = await findManager(searchId);
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

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    searchByRenter: (state, action) => {
      state.renterSearchId = action.payload;
    },
    clearSearchId: (state) => {
      state.renterSearchId = "";
    },
    filterByFloor: (state, action) => {
      state.filterByFloor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRenter.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(searchRenter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.renter = action.payload;
      })
      .addCase(searchRenter.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(searchManager.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(searchManager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.manager = action.payload;
      })
      .addCase(searchManager.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { searchByRenter, clearSearchId, filterByFloor } =
  filterSlice.actions;
export default filterSlice.reducer;
