import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMovie: 0,
};

export const currentMovieSlice = createSlice({
  name: "currentMovieReducer",
  initialState,
  reducers: {
    setCurrentMovies: (state, action) => {
      state.currentMovie = action.payload;
    },
  },
});

export const { setCurrentMovies } = currentMovieSlice.actions;

export default currentMovieSlice.reducer;
