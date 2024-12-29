import React from "react";
import { CDN_MOVIES } from "../utils/constants";

const MovieCard = ({ posterPath, name }) => {
  return (
    <>
      <img
        className=" hover:opacity-90 "
        src={CDN_MOVIES + posterPath}
        alt="demo"
        title={name}
      ></img>
    </>
  );
};

export default MovieCard;
