import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConfirmationLoadingFinished: false,
};

export const isConfirmationLoadingFinishedSlice = createSlice({
  name: "isConfirmationLoadingFinished",
  initialState,
  reducers: {
    setIsConfirmationLoadingStatus: (state, action) => {
      state.isConfirmationLoadingFinished = action.payload;
    },
  },
});

export const { setIsConfirmationLoadingStatus } =
  isConfirmationLoadingFinishedSlice.actions;

export default isConfirmationLoadingFinishedSlice.reducer;
