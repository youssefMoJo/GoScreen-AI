import { configureStore } from "@reduxjs/toolkit";

import preferenceSliceReducer from "./slices/preferenceSlice";
import userInputSliceReducer from "./slices/userInputSlice";

export const store = configureStore({
  reducer: {
    userPreference: preferenceSliceReducer,
    userInput: userInputSliceReducer,
  },
});
