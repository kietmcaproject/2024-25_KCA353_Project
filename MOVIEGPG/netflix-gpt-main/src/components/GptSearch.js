import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptSuggestions from "./GptSuggestions";
import { NETFLIX_BG } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <img className="absolute" src={NETFLIX_BG} alt="demo" />
      <GptSearchBar />
      <GptSuggestions></GptSuggestions>
    </div>
  );
};

export default GptSearch;
