import { configureStore } from "@reduxjs/toolkit";

import preferenceSliceReducer from "./slices/preferenceSlice";
import userInputSliceReducer from "./slices/userInputSlice";
import getRecommendationsSliceReducer from "./slices/getRecommendationsStatus";

export const store = configureStore({
  reducer: {
    userPreference: preferenceSliceReducer,
    userInput: userInputSliceReducer,
    getRecommendationsStatus: getRecommendationsSliceReducer,
  },
});
