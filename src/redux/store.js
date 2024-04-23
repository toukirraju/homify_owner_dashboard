import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slices/message";
import mapReducer from "./features/map/mapSlice";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./features/auth/slice/authSlice";
import renterSlice from "./features/renter/slice/renterSlice";
import profileSlice from "./features/profile/slice/profileSlice";
import filterSlice from "./features/filter/filterSlice";

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    renter: renterSlice,
    profile: profileSlice,
    message: messageReducer,
    map: mapReducer,
    filter: filterSlice,
  },
  // devTools: false,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
