import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function Profile() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const onBack = (e) => {
    setTimeout(() => {
      navigate("/Dashboard");
    }, 1000);
  };

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div>
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r  from-[#07012d] to-[#3c003e] ">
        <div className=" w-[80%] flex gap-3  bg-white h-[80%] p-7">
          <div className="w-[40%] flex  flex-col justify-evenly">
            <div className="  shadow-2xl gap-5 rounded-2xl h-[30%] items-center flex p-3">
              {/* <img alt="" className="w-28" /> */}
              <div className="flex gap-2 flex-col ">
                <h3 className="text-3xl font-bold">Welcome {loggedInUser}</h3>
                <h1 className="italic underline cursor-pointer"></h1>
              </div>
            </div>
            <button
              className=" w-[200px] ml-2 text-white p-1 hover:bg-[#57015a] bg-[#3c003e] mt-2 rounded-full"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="w-[200px] ml-2 text-white p-1 hover:bg-[#57015a] bg-[#3c003e] mt-2 rounded-full"
              onClick={onBack}
            >
              Back
            </button>{" "}
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
