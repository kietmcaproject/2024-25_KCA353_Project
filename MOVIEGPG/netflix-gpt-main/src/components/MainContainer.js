import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movie?.nowPlayingMovies);
  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    const getRandomIndex = () => {
      !movies
        ? setRandomIndex(0)
        : setRandomIndex(Math.floor(Math.random() * movies.length));
    };
    getRandomIndex();
  }, []);
  if (!movies) return;
  const mainMovie = movies[randomIndex];
  const { original_title, overview, id } = mainMovie;

  return (
    <div>
      <VideoTitle title={original_title} overview={overview}></VideoTitle>
      <VideoBackground movieId={id}></VideoBackground>
    </div>
  );
};

export default MainContainer;
