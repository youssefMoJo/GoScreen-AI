import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInput: "",
};

export const userInputSlice = createSlice({
  name: "userInput",
  initialState,
  reducers: {
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
  },
});

export const { setUserInput } = userInputSlice.actions;

export default userInputSlice.reducer;
