import React, { useState, useEffect, useContext } from "react";
import logopng from "../../assets/logopng.png";
import { Outlet, Link } from "react-router-dom";
import axios from "../Api";
import AuthContext from "../context/AuthContext";

const Navbar = (props) => {
  const s1 =
    "bg-blue-500 drop-shadow-lg mx-3 px-7 py-2 rounded-md text-base font-medium text-white transition duration-200 hover:bg-blue-600 hover:drop-shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50";

  const [theme, setTheme] = useState(0);
  const { getLoggedIn } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    aboutUs: false,
    lookingForOrgan: false,
    wantToDonateOrgan: false,
    organBankLogin: false,
  });

  const doc = document.documentElement.classList;

  useEffect(() => {
    let t = localStorage.getItem("theme");
    if (!t) {
      localStorage.setItem("theme", 0);
    }
    t = localStorage.getItem("theme");
    setTheme(t);
    if (t === 1) {
      doc.add("dark");
    }
  }, []);

  const toggleDropdown = (name) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const closeDropdowns = () => {
    setDropdownOpen({
      aboutUs: false,
      lookingForOrgan: false,
      wantToDonateOrgan: false,
      organBankLogin: false,
    });
  };

  return (
    <>
      <nav className="p-3 bg-white-900 sticky top-0 z-10 dark:bg-gray-bg shadow-md">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center justify-between">
              <img
                className="h-14 w-auto ml-6"
                src={logopng}
                draggable={false}
                alt="Your Company"
              />
              <div className="text-2xl font-bold ml-2 text-blue-500">
                LiveBridgeDonor
              </div>
            </div>
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i
              className={`fa-solid fa-${
                isMobileMenuOpen ? "times" : "bars"
              } fa-lg`}
            ></i>
          </button>

          {/* Navigation for larger screens */}
          <div className="hidden md:flex md:items-center">
            <div className="flex items-center">
              {/* Dropdowns for desktop view */}
              <div className="relative">
                <button
                  className={s1}
                  onClick={() => toggleDropdown("aboutUs")}
                >
                  About Us
                </button>
                {dropdownOpen.aboutUs && (
                  <div className="absolute mt-2 w-48 bg-white-900 shadow-lg">
                    <Link
                      to="/"
                      onClick={closeDropdowns}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                    >
                      Home
                    </Link>
                    <Link
                      to="/about"
                      onClick={closeDropdowns}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                    >
                      About Organ
                    </Link>
                    <Link
                      to="/contactUs"
                      onClick={closeDropdowns}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                    >
                      Contact Us
                    </Link>
                  </div>
                )}
              </div>

              {/* Additional dropdowns for user navigation */}
              {props.logIn ? (
                <>
                  <Link to={`/${props.user}/profile`} className={s1}>
                    <i className="fa-solid fa-user"></i>
                  </Link>
                  <Link
                    to="/"
                    onClick={async () => {
                      await axios.get("/auth/logout", {
                        withCredentials: true,
                      });
                      await getLoggedIn();
                    }}
                    className={s1}
                  >
                    Log Out
                  </Link>
                </>
              ) : (
                <>
                  {/* Dropdown for "Looking For Organ" */}
                  <div className="relative">
                    <button
                      className={s1}
                      onClick={() => toggleDropdown("lookingForOrgan")}
                    >
                      Looking For Organ
                    </button>
                    {dropdownOpen.lookingForOrgan && (
                      <div className="absolute mt-2 w-48 bg-white-900 shadow-lg">
                        <Link
                          to="/register/patient"
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                        >
                          Patient Login/Register
                        </Link>
                        <Link
                          to="/bloodDirect"
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                        >
                          Organ Donation Directory
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Dropdown for "Want To Donate Organ" */}
                  <div className="relative">
                    <button
                      className={s1}
                      onClick={() => toggleDropdown("wantToDonateOrgan")}
                    >
                      Want To Donate Organ
                    </button>
                    {dropdownOpen.wantToDonateOrgan && (
                      <div className="absolute mt-2 w-48 bg-white-900 shadow-lg">
                        <Link
                          to="/register/donor"
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                        >
                          Donor Login/Register
                        </Link>
                        <Link
                          to="/bloodCamps"
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                        >
                          Organ Donation Camps
                        </Link>
                        <Link
                          to="/aboutBloodDonation"
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                        >
                          About Organ Donation
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Dropdown for "Organ Bank Login" */}
                  <div className="relative">
                    <button
                      className={s1}
                      onClick={() => toggleDropdown("organBankLogin")}
                    >
                      Organ Bank Login
                    </button>
                    {dropdownOpen.organBankLogin && (
                      <div className="absolute mt-2 w-48 bg-white-900 shadow-lg">
                        <Link
                          to="/login/bank"
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register/bank"
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                        >
                          Add Your OrganBank
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dropdown for mobile view */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-2">
              {/* Dropdown for "About Us" */}
              <div className="relative">
                <button
                  className={s1}
                  onClick={() => toggleDropdown("aboutUs")}
                >
                  About Us
                </button>
                {dropdownOpen.aboutUs && (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/"
                      onClick={closeDropdowns}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                    >
                      Home
                    </Link>
                    <Link
                      to="/about"
                      onClick={closeDropdowns}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                    >
                      About Organ
                    </Link>
                    <Link
                      to="/contactUs"
                      onClick={closeDropdowns}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                    >
                      Contact Us
                    </Link>
                  </div>
                )}
              </div>

              {/* Conditionally render the links based on authentication */}
              {props.logIn ? (
                <>
                  <Link to={`/${props.user}/profile`} className={s1}>
                    <i className="fa-solid fa-user"></i> Profile
                  </Link>
                  <Link
                    to="/"
                    onClick={async () => {
                      await axios.get("/auth/logout", {
                        withCredentials: true,
                      });
                      await getLoggedIn();
                    }}
                    className={s1}
                  >
                    Log Out
                  </Link>
                </>
              ) : (
                <>
                  <div className="relative">
                    <button
                      className={s1}
                      onClick={() => toggleDropdown("lookingForOrgan")}
                    >
                      Looking For Organ
                    </button>
                    {dropdownOpen.lookingForOrgan && (
                      <div className="flex flex-col space-y-2">
                        <Link
                          to="/register/patient"
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                        >
                          Patient Login/Register
                        </Link>
                        <Link
                          to="/bloodDirect"
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                        >
                          Organ Donation Directory
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      className={s1}
                      onClick={() => toggleDropdown("wantToDonateOrgan")}
                    >
                      Want To Donate Organ
                    </button>
                    {dropdownOpen.wantToDonateOrgan && (
                      <div className="flex flex-col space-y-2">
                        <Link
                          to="/register/donor"
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                        >
                          Donor Login/Register
                        </Link>
                        <Link
                          to="/bloodCamps"
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                        >
                          Organ Donation Camps
                        </Link>
                        <Link
                          to="/aboutBloodDonation"
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                        >
                          About Organ Donation
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      className={s1}
                      onClick={() => toggleDropdown("organBankLogin")}
                    >
                      Organ Bank Login
                    </button>
                    {dropdownOpen.organBankLogin && (
                      <div className="flex flex-col space-y-2">
                        <Link
                          to="/login/bank"
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register/bank"
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-500 active:text-white transition duration-150"
                        >
                          Add Your OrganBank
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
