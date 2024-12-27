
import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import { Menu } from "lucide-react";
import ShowTeamEvents from "../../Components/ShowTeamEvents";

function ListedTeamEvents() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Header */}
        <header className="bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md">
          <div className="py-4 px-4 flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:text-gray-200 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-white">
              Listed Team Events
            </h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 p-6">
          <div className="p-6 bg-white shadow-md rounded-lg border-t-4 border-purple-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Explore Team Events
            </h2>
            <p className="text-gray-600 mb-6">
              Check out the latest team-based activities and competitions.
              Join a team or explore the event details to participate.
            </p>
            <ShowTeamEvents />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ListedTeamEvents;
