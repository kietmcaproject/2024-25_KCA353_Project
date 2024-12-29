import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO, PROFILE_LOGO } from "../utils/constants";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiSearchEyeLine } from "react-icons/ri";
import {
  toggleGptHomepageToSearch,
  toggleGptSearch,
  toggleGptSearchToHomepage,
} from "../utils/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const user = useSelector((store) => store.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.clear();
        //navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  const GptButtonText = useSelector((store) => store.gpt.gptSearchToHomepage);
  const handleGptSearchToggle = () => {
    //toggle button

    console.log("called");
    dispatch(toggleGptSearch());
    if (GptButtonText === "GPT") {
      dispatch(toggleGptSearchToHomepage());
    } else {
      dispatch(toggleGptHomepageToSearch());
    }
  };
  //const GptButtonText = useSelector((store) => store.gpt.gptSearchToHomepage);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
        localStorage.clear();
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (user !== null) {
      const displayName = user.displayName;
      localStorage.setItem("myValue", displayName);
    }
    return () => {
      setName(localStorage.getItem("myValue"));
    };
  }, []);

  return (
    <div className="absolute w-screen h-auto px-2 py-2 bg-gradient-to-b from-black z-10 flex justify-between overflow-x-hidden ">
      <img className="w-2/12 p-5" src={NETFLIX_LOGO} alt="demo" />

      {/*<Provider store={AppStore}>{user && <p>{displayName}</p>}</Provider>*/}

      {user && (
        <div className="flex py-2 px-2">
          <button
            className="text-black p-4 flex h-12 w-wrap  bg-white mr-2 rounded-md hover:bg-opacity-60 "
            onClick={handleGptSearchToggle}
          >
            <p className="-mt-1 mr-1">{GptButtonText}</p>
            {GptButtonText === "GPT" && <RiSearchEyeLine />}
          </button>
          <img
            className="relative w-12 h-12 border shadow-xl"
            src={PROFILE_LOGO}
            alt="default"
          ></img>
          <div className="flex justify-between">
            <button onClick={toggleDropdown}>
              <RiArrowDropDownLine className="text-white h-10 w-10" />
            </button>
            {isOpen && (
              <div
                className="origin-top-right absolute right-0 m-2 w-parent  rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <div className="py-1" role="none">
                  {/* Additional user information */}
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:text-gray-200 hover:border-b border-gray-700"
                    role="menuitem"
                    onClick={toggleDropdown}
                  >
                    Welcome, {name}
                  </button>

                  {/* Signout button */}
                  <button
                    className="block w-full text-left px-4 py-2 mr-5 text-sm text-gray-200  hover:text-gray-200
                    hover:border-b border-gray-700"
                    role="menuitem"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
