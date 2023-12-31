import { configureStore } from "@reduxjs/toolkit";

import preferenceSliceReducer from "./slices/preferenceSlice";
import userInputSliceReducer from "./slices/userInputSlice";
import getRecommendationsSliceReducer from "./slices/getRecommendationsStatus";
import isConfirmationLoadingFinishedSliceReducer from "./slices/confirmationLoading";
import moviesSliceReducer from "./slices/movies";
import currentMovieSliceReducer from "./slices/currentMovie";

export const store = configureStore({
  reducer: {
    userPreference: preferenceSliceReducer,
    userInput: userInputSliceReducer,
    getRecommendationsStatus: getRecommendationsSliceReducer,
    isConfirmationLoadingFinished: isConfirmationLoadingFinishedSliceReducer,
    movies: moviesSliceReducer,
    currentMovie: currentMovieSliceReducer,
  },
});
