import { configureStore } from "@reduxjs/toolkit";

import preferenceSliceReducer from "./slices/preferenceSlice";
import userInputSliceReducer from "./slices/userInputSlice";
import getRecommendationsSliceReducer from "./slices/getRecommendationsStatus";
import isConfirmationLoadingFinishedSliceReducer from "./slices/confirmationLoading";

export const store = configureStore({
  reducer: {
    userPreference: preferenceSliceReducer,
    userInput: userInputSliceReducer,
    getRecommendationsStatus: getRecommendationsSliceReducer,
    isConfirmationLoadingFinished: isConfirmationLoadingFinishedSliceReducer,
  },
});
