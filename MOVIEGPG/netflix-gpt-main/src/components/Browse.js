import React from "react";
import Header from "./Header";
import { NETFLIX_BG } from "../utils/constants";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  return (
    <div>
      <Header></Header>
      {showGptSearch ? (
        <GptSearch></GptSearch>
      ) : (
        <>
          <MainContainer className="absolute"></MainContainer>
          <SecondaryContainer className="absolute"></SecondaryContainer>
        </>
      )}
    </div>
  );
};

export default Browse;
