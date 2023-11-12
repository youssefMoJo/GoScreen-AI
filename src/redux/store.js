import { configureStore } from "@reduxjs/toolkit";

import preferenceSliceReducer from "./slices/preferenceSlice";

export const store = configureStore({
  reducer: {
    userPreference: preferenceSliceReducer,
  },
});
