import React,{ useEffect, useState } from "react";
import { attempts_Number, earnPoints_Number, flagResult } from './helper/helper.js';
import {  useSelector } from 'react-redux';
import { handleError, handleSuccess } from '../utils';



export default function ScoreTable() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const { questions : { queue ,answers}, result : { result, userId}}  = useSelector(state => state)

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");

  }, []);
  const totalPoints = queue.length * 10; 
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10)
  const flag = flagResult(totalPoints, earnPoints)
 
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg max-w-2xl mx-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th className="px-4 py-2 border border-gray-300">Attempts</th>
            <th className="px-4 py-2 border border-gray-300">Earned Points</th>
            <th className="px-4 py-2 border border-gray-300">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center bg-white hover:bg-gray-100">
            <td className="px-4 py-2 border border-gray-300">{loggedInUser}</td>
            <td className="px-4 py-2 border border-gray-300">{attempts || 0}</td>
            <td className="px-4 py-2 border border-gray-300">{earnPoints || 0}</td>
            <td className="px-4 py-2 border border-gray-300 text-green-600 font-semibold">{flag ? "Passed" : "Failed"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
