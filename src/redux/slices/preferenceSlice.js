import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  preference: "",
};

export const preferenceSlice = createSlice({
  name: "userPreference",
  initialState,
  reducers: {
    setPreference: (state, action) => {
      state.preference = action.payload;
    },
  },
});

export const { setPreference } = preferenceSlice.actions;

export default preferenceSlice.reducer;
