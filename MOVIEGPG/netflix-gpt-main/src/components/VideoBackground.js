import { useSelector } from "react-redux";

import useTrailer from "../hooks/useTrailer";
//movie id chyh
const VideoBackground = ({ movieId }) => {
  useTrailer(movieId);
  const trailerVideo = useSelector((store) => store.movie?.trailerVideo);
  return (
    <div className="w-screen ">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&playlist=" +
          trailerVideo?.key +
          "&loop=1&mute=1&rel=0&controls=0"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
