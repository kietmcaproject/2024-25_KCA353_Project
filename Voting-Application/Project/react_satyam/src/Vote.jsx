import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./Footer";

const Vote = () => {
  const [voted, setVoted] = useState(false);
  const [mathCounter, setMathCount] = useState(0);
  const [englishCounter, setEnglishCount] = useState(0);
  const [scienceCounter, setScienceCount] = useState(0);
  const scienceVote = () => {
    const updateScienceCount = scienceCounter + 1;
    setScienceCount(updateScienceCount);
    try {
      axios.post("http://localhost:3001/Science", {
        scienceCount: updateScienceCount,
      });
      toast.success("Vote successfully");
      setVoted(true);

      console.log(updateScienceCount);
    } catch (err) {
      toast.error("Error voting");
    }
  };

  const englishVote = () => {
    const updateEnglishCount = englishCounter + 1;
    setEnglishCount(updateEnglishCount);
    try {
      axios.post("http://localhost:3001/English", {
        englishCount: updateEnglishCount,
      });
      toast.success("Vote successfully");
      setVoted(true);

      console.log(updateEnglishCount);
    } catch (err) {
      toast.error("Error voting");

      console.log("Error", err);
    }
  };

  const mathVote = (e) => {
    const updateCount = mathCounter + 1;
    setMathCount(updateCount);
    try {
      axios.post("http://localhost:3001/Math", { mathCount: updateCount });
      toast.success("Vote successfully");
      setVoted(true);
      console.log(updateCount);
    } catch (err) {
      toast.error("Error voting");

      console.log("Error", err);
    }
  };

  const handleVote = (subject) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [subject]: prevVotes[subject] + 1,
    }));
  };

  return (
    <>
      <Header />
      <div className="h-full bg-gray-100 flex flex-col items-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Vote for Your Favorite Course
        </h1>

        <div className="flex flex-wrap justify-center gap-16">
          <div className="bg-white rounded-lg shadow-lg p-6 w-64 text-center transform hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Math</h2>
            <p className="text-gray-800 mb-4">
              A fascinating world of equations. Cast your vote if
              Math is your favorite!
            </p>
            <button
              onClick={() => mathVote()}
              disabled={voted}
              className={`bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition duration-300 ${
                voted ? "cursor-not-allowed" : ""
              }`}
              aria-label="Vote for Math"
            >
              Vote for Math
            </button>
          </div>

          {/* Science Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-64 text-center transform hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Science</h2>
            <p className="text-gray-600 mb-4">
              Discover the wonders of the universe. Vote if Science is your
              favorite!
            </p>
            <button
              onClick={() => scienceVote()}
              disabled={voted}
              className={`bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500 transition duration-300 ${voted ? 'cursor-not-allowed' : ''}`}              aria-label="Vote for Science"
            >
              Vote for Science{" "}
            </button>
          </div>

          {/* English Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-64 text-center transform hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">English</h2>
            <p className="text-gray-600 mb-4">
              Explore the beauty of language and literature. Vote if English is
              your favorite!
            </p>
            <button
              onClick={() => englishVote()}
              disabled={voted}
              className={`bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-500 transition duration-300 ${
                voted ? "cursor-not-allowed" : ""
              }`}
              aria-label="Vote for English"
            >
              {" "}
              Vote for English{" "}
            </button>
          </div>
        </div>

        <div className="mt-10">
          <NavLink to="/Result">
            <button
              className={`bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-500 transition duration-300
              }`}
              aria-label="View Results"
            >
              View Results{" "}
            </button>
          </NavLink>
        </div>
      </div>
      <ToastContainer />
      <div className="mt-12">
        <Footer />
      </div>
    </>
  );
};

export default Vote;
