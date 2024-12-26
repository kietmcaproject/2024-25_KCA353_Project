import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Navbar() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: { street: "", city: "", state: "" },
    profilePicture: "",
  });
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/auth/user-details`, {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUserDetails({
          name: data.user.name,
          address: data.user.address,
          profilePicture: data.user.profilePicture,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const hiddenPaths = ["/", "/Annamitra", "/Signup", "/Login"];
  const isHiddenPath = hiddenPaths.includes(location.pathname);

  if (isHiddenPath) {
    return (
      <div className="bg-white shadow-md">
        <div className="flex items-center p-2">
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            className="h-16 cursor-pointer"
            onClick={() => (window.location = "/Annamitra")}
          />
        </div>
        <hr className="border-gray-200" />
      </div>
    );
  }

  const { name, address, profilePicture } = userDetails;

  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <img
          src="/assets/images/logo.png"
          alt="Logo"
          className="h-16 cursor-pointer"
          onClick={() => (window.location = "/dashboard")}
        />

        <div className="flex gap-2">
          {/* User Details */}
          <div className="text-right">
            <p className="text-sm text-gray-800 font-medium">Hi, {name}!</p>
            <p className="text-xs text-gray-600">
              {address.street}, {address.city}, {address.state}
            </p>
          </div>

          {/* Profile Picture */}
          <img
            src={`${BASE_URL}${profilePicture}`}
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover cursor-pointer"
            onClick={toggleSidebar}
            onError={(e) => {
              e.target.src = "/assets/images/profilepic.jpeg";
            }}
          />
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="absolute top-12 right-4 bg-white border rounded-lg shadow-md w-40 py-2 z-50">
          {[
            { label: "Home", path: "/Dashboard", icon: "home.png" },
            { label: "About Us", path: "/AboutUs", icon: "aboutus.png" },
            { label: "Community", path: "/community", icon: "community.png" },
            { label: "Profile", path: "/edit-profile", icon: "profile.png" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => (window.location = item.path)}
            >
              <img
                src={`/assets/images/${item.icon}`}
                alt={item.label}
                className="h-4 w-4 mr-2"
              />
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      <hr className="border-gray-200" />
    </div>
  );
}

export default Navbar;
