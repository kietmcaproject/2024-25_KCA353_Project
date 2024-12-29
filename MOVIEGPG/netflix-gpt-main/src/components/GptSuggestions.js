import React, { useState } from "react";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import MovieList from "./MovieList";

const GptSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  return (
    <div className="mt-[5%] ">
      <div className="absolute bg-black bg-opacity-85 mx-auto left-0 right-0 h-[500px] overflow-y-scroll  no-scrollbar w-1/2 border-[8px] border-black z-10 ">
        {/*<div className="flex  w-[30%] ">
          {movies &&
            movies.map((movie) => (
              <MovieCard
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1.1 }}
                className="min-w-full"
                key={movie?.[0]?.id}
                posterPath={movie?.[0]?.poster_path}
                name={movie?.[0]?.original_title}
              ></MovieCard>
            ))}
        </div>*/}
        {movieNames &&
          movieNames.map((movie, index) => (
            <MovieList title={movie} movies={movieResults[index]} />
          ))}
      </div>
    </div>
  );
};

export default GptSuggestions;
