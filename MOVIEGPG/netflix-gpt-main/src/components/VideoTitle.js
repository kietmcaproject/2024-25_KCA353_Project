import React, { useState } from "react";
const VideoTitle = ({ title, overview }) => {
  const [toggleInfo, setToggleInfo] = useState(false);
  const handleToggleInfo = () => {
    setToggleInfo(!toggleInfo);
  };

  return (
    <div className=" pl-[6%] pt-[10%] absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="font-bold text-3xl w-1/4">{title}</h1>
      {toggleInfo && <p className="text-xl py-6 w-1/4">{overview}</p>}
      <div className="flex">
        {/*<button className="bg-white text-black w-wrap text-xl rounded-md px-10 py-4 mx-4 flex hover:bg-opacity-60">
          <FaPlay className="mx-2 mt-1" />
          Play
  </button>*/}
        <button
          className="bg-gray-500 text-white my-6 w-wrap text-xl rounded-md px-10 py-4 bg-opacity-70 hover:bg-opacity-50"
          onClick={handleToggleInfo}
        >
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
