// import Image from "next/image";
// import Logo from "@/public/assests/landingPage/logo.png";
// import { FaBars } from "react-icons/fa";
// import Button from "./Button";

// const Header = () => {
//   return (
//     <header className="flex justify-between items-center px-6 py-4 backdrop-blur-md sticky top-0 z-20 bg-gradient-to-r from-[#E0E7FD] to-[#FDFEFF] shadow-md">
//       <Image src={Logo} alt="Logo" className="cursor-pointer"/>
//       <FaBars className="block md:hidden" />
//       <nav className="hidden md:block">
//         <ul className="flex gap-4 items-center">
//           <li>
//             <a href="#">Features</a>
//           </li>
//           <li>
//             <a href="#">About</a>
//           </li>
//           <li>
//             <a href="#">Testmonial</a>
//           </li>
//           <Button text="signup" color="black"/>
//           <Button text="login" color="#001F82"/>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/assests/landingPage/logo.png";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import Button from "./Button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle theme (light/dark)
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark"); // Add dark class to <html> element
      localStorage.setItem("theme", "dark"); // Save theme in localStorage
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark"); // Remove dark class
      localStorage.setItem("theme", "light"); // Save theme in localStorage
    }
  };

  // On initial load, check localStorage for theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else {
      // Default to light theme
      setTheme("light");
    }
  }, []);

  return (
    <header className="flex justify-between items-center px-6 py-4 backdrop-blur-md sticky top-0 z-20 bg-gradient-to-r from-[#E0E7FD] to-[#FDFEFF] shadow-md">
      <Image src={Logo} alt="Logo" className="cursor-pointer" />

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden" onClick={toggleMenu}>
        {isOpen ? (
          <FaTimes size={24} className="cursor-pointer" />
        ) : (
          <FaBars size={24} className="cursor-pointer" />
        )}
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex gap-4 items-center">
          {/* <li>
            <a href="#">Features</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Testmonial</a>
          </li> */}
          <Button text="signup" color="black" />
          <Button text="login" color="#001F82" />

          {/* Light/Dark Mode Toggle */}
          <div className="cursor-pointer" onClick={toggleTheme}>
            {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}
          </div>
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-0 left-0 w-full h-screen bg-white flex justify-center items-center md:hidden`}
      >
        <ul className="flex flex-col gap-6 items-center">
          <li>
            <a href="#">Features</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Testmonial</a>
          </li>
          <Button text="signup" color="black" />
          <Button text="login" color="#001F82" />
        </ul>

        {/* Close button (only shown when the menu is open on mobile) */}
        <div
          className="absolute top-4 right-6 cursor-pointer md:hidden"
          onClick={toggleMenu}
        >
          <FaTimes size={24} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
