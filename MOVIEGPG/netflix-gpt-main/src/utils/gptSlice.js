import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptSearchToHomepage: "GPT",
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    toggleGptSearchToHomepage: (state) => {
      state.gptSearchToHomepage = "Homepage";
    },
    toggleGptHomepageToSearch: (state) => {
      state.gptSearchToHomepage = "GPT";
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const {
  toggleGptSearch,
  toggleGptSearchToHomepage,
  toggleGptHomepageToSearch,
  addGptMovieResult,
} = gptSlice.actions;
export default gptSlice.reducer;
