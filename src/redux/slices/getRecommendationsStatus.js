import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getRecommendationsStatus: false,
};

export const getRecommendationsSlice = createSlice({
  name: "getRecommendationsStatus",
  initialState,
  reducers: {
    setGetRecommendationsStatus: (state, action) => {
      state.getRecommendationsStatus = action.payload;
    },
  },
});

export const { setGetRecommendationsStatus } = getRecommendationsSlice.actions;

export default getRecommendationsSlice.reducer;
