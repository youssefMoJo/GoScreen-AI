import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConfirmationLoadingFinished: false,
};

export const isConfirmationLoadingFinishedSlice = createSlice({
  name: "isConfirmationLoadingFinished",
  initialState,
  reducers: {
    setIsConfirmationLoadingFinished: (state, action) => {
      state.isConfirmationLoadingFinished = action.payload;
    },
  },
});

export const { setIsConfirmationLoadingFinished } =
  isConfirmationLoadingFinishedSlice.actions;

export default isConfirmationLoadingFinishedSlice.reducer;
