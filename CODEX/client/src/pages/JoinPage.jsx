import logo from "../assets/code-logo.png";
import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function JoinPage() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const createNewRoom = (e) => {
    e.preventDefault();

    if (!isLoggedIn()) {
      toast.error("Please login to create a new room");
      navigate("/login", { state: { from: "/" } });
      return;
    }

    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new room");

    navigate(`/editor/${id}`, {
      state: {
        username,
        language: selectedLanguage,
      },
    });
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("ROOM ID, username, and language are required");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
        language: selectedLanguage,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {!isLoggedIn() ? (
        <button className="logoutBtn" onClick={() => navigate("/login")}>
          Login
        </button>
      ) : (
        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>
      )}
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Codex Logo" className="h-12 w-12" />
            <span className="text-emerald-500 text-3xl font-bold">CODEX</span>
          </div>
        </div>

        <div className="bg-[#1e1e1e] border border-emerald-800 rounded-lg shadow-lg shadow-emerald-800/20 p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-emerald-400 text-center">
            Paste invitation ROOM ID
          </h1>
          <div className="space-y-4">
            <input
              type="text"
              className="bg-black border border-emerald-800 text-emerald-300 placeholder-emerald-500 rounded-lg w-full h-12 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg"
              placeholder="ROOM ID"
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
              onKeyUp={handleInputEnter}
            />
            <input
              type="text"
              className="bg-black border border-emerald-800 text-emerald-300 placeholder-emerald-500 rounded-lg w-full h-12 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg"
              placeholder="USERNAME"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onKeyUp={handleInputEnter}
            />

            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg h-12 text-lg transition-all duration-300 ease-in-out"
              onClick={joinRoom}
            >
              Join
            </button>

            
          </div>
          <div className="text-center text-sm">
            <span className="text-emerald-600">
              If you don't have room then enter name and{" "}
            </span>
            <button
              onClick={createNewRoom}
              className="text-emerald-500 hover:text-emerald-400 font-semibold underline mt-2"
            >
              {" "}
              new room
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-emerald-700">
          Built with <span className="text-emerald-500">❤️</span> by{" "}
          <Link
            to="/ContributorsPage"
            className="text-emerald-500 hover:text-emerald-400"
          >
            Team Codex
          </Link>
        </div>
      </div>
    </div>
  );
}
