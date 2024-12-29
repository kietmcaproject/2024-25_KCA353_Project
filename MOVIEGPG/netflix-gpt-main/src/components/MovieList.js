import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="p-6 ">
      <h1 className="text-3xl font-bold py-6 text-white">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex ">
          {movies &&
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                className="min-w-full"
                posterPath={movie.backdrop_path}
                name={movie.original_title}
              ></MovieCard>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
