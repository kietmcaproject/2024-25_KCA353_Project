import React, { useEffect, useState } from "react";
import gold from "./1st.png";
import silver from "./2nd.png";
import bronze from "./3rd.png";
import user2 from "./user2.png";
import top from "./top3.png";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  attempts_Number,
  earnPoints_Number,
  flagResult,
} from "./helper/helper.js";
import { resetAllAction } from "./redux/question_reducer";
import { resetResultAction } from "./redux/result_reducer";
import { handleError, handleSuccess } from "../utils";

import ScoreTable from "./ScoreTable.jsx";

const Score = () => {
  const dispatch = useDispatch();
  const [loggedInUser, setLoggedInUser] = useState("");
  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);

  // useEffect(() => {
  //   setLoggedInUser(localStorage.getItem("loggedInUser"));
  // }, []);
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    } else {
      console.error("No user found in localStorage");
    }
  }, []);
  
  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  const flag = flagResult(totalPoints, earnPoints);

  const navigate = useNavigate();
  const onBack = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    dispatch(resetAllAction());
    dispatch(resetResultAction);
    setTimeout(() => {
      navigate("/Dashboard");
    }, 1000);
  };

  return (
    <div className="w-screen flex justify-center bg-slate-100 items-center h-screen">
      <div className="w-3/4 h-[500px] flex rounded-r-3xl bg-[#3c003e]">
        {/* Profile Section */}
        <div className="w-1/3 text-white text-center flex flex-col gap-4 justify-center items-center">
          <div className="flex items-center">
            <img src={user2} className="w-12 " alt="User" />
            <h1 className="text-5xl font-bold cursor-pointer ml-4">
              {loggedInUser}
            </h1>
          </div>
          <h1 className="cursor-pointer underline hover:scale-105 transition-transform duration-200 italic underline-offset-2">
            Edit Profile
          </h1>
          <div className="bg-white text-black p-3 rounded-3xl w-72">
            <h3 className="text-xl font-bold shadow-md">Your Top 3 Scores</h3>
            <div className="flex flex-col gap-3 text-xl">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <img src={gold} alt="Gold" className="w-8" />
                    </td>
                    <td className="w-24 border-r-2">Node Js</td>
                    <td className="w-24">8.4</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={silver} alt="Silver" className="w-10" />
                    </td>
                    <td className="w-24 border-r-2">Node Js</td>
                    <td className="w-24">8.4</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={bronze} alt="Bronze" className="w-8" />
                    </td>
                    <td className="w-24 border-r-2">Node Js</td>
                    <td className="w-24">8.4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Score Section */}
        <div className="bg-white w-[70%] rounded-r-[50px] flex flex-col items-center p-4">
          <div className="flex items-center gap-2 justify-center">
            <h1 className="text-4xl font-bold text-center mt-3">Your Score</h1>
            <img src={top} className="h-8 mt-4" alt="Top" />
          </div>

          {/* Score Details */}
          <div className="w-full flex flex-col items-start gap-4 mt-4 pl-12">
            <div className="flex gap-2">
              <span className="font-bold">Username:</span>
              <span>{loggedInUser}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Total Quiz Points:</span>
              <span>{totalPoints || 0}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Total Questions</span>
              <span>{queue.length || 0}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Total Attempts:</span>
              <span>{attempts || 0}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Total Earn Points:</span>
              <span>{earnPoints || 0}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Quiz Result:</span>
              <span style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }}>
                {flag ? "Passed" : "Failed"}
              </span>
            </div>
            <button
              className="w-[200px] ml-2 text-white p-1 hover:bg-[#57015a] bg-[#3c003e] mt-2 rounded-full"
              onClick={onBack}
            >
              Back
            </button>
          </div>
          <div>
            <ScoreTable></ScoreTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
