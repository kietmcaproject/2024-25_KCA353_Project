import React, { useEffect, useRef, useState } from "react";
import { SEARCH_PLACEHOLDER, SEARCH_TEXT } from "../utils/languageConstants";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  /*const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    //make an api call to openai
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query:" +
      searchText.current.value +
      "only give me 5 movies, comma separated like the example result given ahead. Example result: Bhramastra, PK, 3idiots, Dunki, Salaar ";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    console.log(gptResults.choices);
  };*/
  const searchMovieTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const getGptMovies = async () => {
    const gptQuery =
      "Act as a movie recommendation system and suggest movies whether they are adult or not, for the query:" +
      searchText.current.value +
      "only give me 5 movies, comma separated like the example result given ahead. Example result: Bhramastra, PK, 3idiots, Dunki, Salaar ";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    console.log(gptResults.choices?.[0]?.message?.content.split(","));
    //search for each movie

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    const promiseArray = gptMovies.map((movie) => searchMovieTmdb(movie));
    //it will return promises now we need to resolve promises
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
    /*Promise.all(promiseArray).then((values) => {
      console.log(values);
    });*/
  };

  useEffect(() => {
    if (buttonClicked) {
      getGptMovies();
      setButtonClicked(false);
    }
  }, [buttonClicked]);

  return (
    <div className="flex justify-center pt-[12%]">
      <form
        className=" absolute  w-6/12  bg-black bg-opacity-85 grid grid-cols-12 rounded-lg text-white "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          className="p-4 m-4  rounded-md text-black col-span-9"
          placeholder={SEARCH_PLACEHOLDER}
        ></input>
        <button
          className="bg-red-700 col-span-3 rounded-md p-4 m-4  text-white hover:bg-opacity-60"
          onClick={() => setButtonClicked(true)}
        >
          {SEARCH_TEXT}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
