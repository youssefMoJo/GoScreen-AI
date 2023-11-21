import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

export const moviesSlice = createSlice({
  name: "moviesReducer",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
