import { configureStore } from "@reduxjs/toolkit";
import { api } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
  devTools: true,
});

export default store;
