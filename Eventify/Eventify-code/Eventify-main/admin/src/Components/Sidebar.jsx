import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, List, Edit, PlusCircle, Menu, X } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const menuItems = [
    {
      id: "listed-events",
      icon: List,
      label: "Listed Events",
      path: "/events",
    },
    {
      id: "listed-team-events",
      icon: List,
      label: "Listed Team Events",
      path: "/team-events",
    },
    {
      id: "change-events",
      icon: Edit,
      label: "Change Events",
      path: "/change-events",
    },
    {
      id: "create-events",
      icon: PlusCircle,
      label: "Create Events",
      path: "/create-event",
    },
    {
      id: "create-team-event",
      icon: PlusCircle,
      label: "Create Team Event",
      path: "/create-team-event",
    },
    {
      id: "registrations",
      icon: List,
      label: "Registrations",
      path: "/registrations",
    },
    {
      id: "team-registration",
      icon: List,
      label: "Team Registration",
      path: "/team-registrations",
    },
  ];

  return (
    <>
      <div
        className={`bg-gray-800 text-white w-64 p-4 fixed left-0 top-0 h-full z-20 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 mr-2" />
            <h2 className="text-xl font-bold">Event Manager</h2>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center w-full p-2 rounded-lg mb-2 transition-colors ${
                location.pathname === item.path
                  ? "bg-purple-600"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5 mr-2" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
