import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirmationLoadingStatus: false,
};

export const confirmationLoadingSlice = createSlice({
  name: "confirmationLoadingStatus",
  initialState,
  reducers: {
    setConfirmationLoadingStatus: (state, action) => {
      state.confirmationLoadingStatus = action.payload;
    },
  },
});

export const { setConfirmationLoadingStatus } =
  confirmationLoadingSlice.actions;

export default confirmationLoadingSlice.reducer;
