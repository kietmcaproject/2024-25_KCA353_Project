import React, { useEffect } from "react";
import bg from "../../assets/header-image-new.png";
import bg2 from "../../assets/bg2.png";
import g1 from "../../assets/donation/g1.jpg";
import g2 from "../../assets/donation/g2.jpg";
import g3 from "../../assets/donation/g3.jpg";
import g4 from "../../assets/donation/g4.jpg";
import { Link } from "react-router-dom";
import Chatbot from "./Chatbot";
import faqsData from "./faqs.json"; // Import your FAQs
import { useState } from "react";

import { FaComments, FaTimes } from "react-icons/fa";
const Home = () => {
  const temp2 = [
    { title: "Registration", img: g1 },
    { title: "Seeing", img: g2 },
    { title: "Donation", img: g3 },
    { title: "Save Life", img: g4 },
  ];

  const [displayedFaqs, setDisplayedFaqs] = useState([]);
  useEffect(() => {
    // Assuming your JSON data is in the correct format
    setDisplayedFaqs(faqsData);
  }, []);

  return (
    <div className="dark:bg-gray-900 dark:text-white scroll-smooth">
      {/* Hero Section */}
      <div className="relative flex flex-col-reverse md:flex-row items-center">
        {/* Left Side (Text Content) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:pl-16 text-left">
          <h1 className="text-4xl md:text-6xl text-blue-500 font-bold mb-4">
            Pledge To Become <br /> A Donor
          </h1>
          <h3 className="text-lg md:text-2xl font-medium mb-6">
            More than 100,000 people are waiting for a lifesaving transplant.
            You can help.
          </h3>

          {/* Quotes Section */}
          <div className="mt-12 bg-blue-500 p-6 rounded-lg shadow-lg text-white text-center">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              "The greatest gift you can give someone is your organ, your heart,
              and your love."
            </h2>
            <h3 className="text-base md:text-lg font-light mb-2">
              "Be the reason someone believes in the goodness of people."
            </h3>
            <h3 className="text-base md:text-lg font-light">
              "You don't have to be a doctor to save a life. Sign up as an organ
              donor."
            </h3>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="w-full md:w-1/2 relative">
          <img
            src={bg}
            alt="Organ Donation"
            className="w-full h-[40vh] md:h-[80vh] object-cover opacity-90"
          />
        </div>
      </div>

      {/* Learn About Donation Section */}
      <div
        id="learn"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 px-6 md:px-20 lg:px-52 place-items-center"
      >
        <div>
          <img
            draggable={false}
            src={bg2}
            width="100%"
            alt="Donation Graphic"
            className="rounded-lg shadow-xl transition-transform transform hover:scale-105"
          />
        </div>
        <div className="text-center md:text-left">
          <p className="text-3xl md:text-4xl font-bold text-blue-500">
            Learn About Donation
          </p>
          <p className="mt-6 text-base md:text-lg text-gray-800 dark:text-gray-300">
            Organ donation is the ultimate act of humanity. When you donate your
            organs, you give someone else the chance to live a healthier and
            fuller life. By signing up, you could potentially save multiple
            lives.
          </p>
          <Link
            to={"/aboutBloodDonation"}
            className="inline-block mt-8 bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Discover More
          </Link>
        </div>
      </div>

      {/* Steps for Donation Section */}
      <div className="mt-20 px-6 lg:px-36">
        <h2 className="text-4xl font-semibold text-blue-500 text-center mb-12">
          Steps for Donation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {temp2.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-32 object-cover rounded-md"
              />
              <h3 className="text-center mt-6 text-lg md:text-2xl font-semibold text-gray-800 dark:text-white">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ChatBot Component for FAQs */}
      <Chatbot faqs={displayedFaqs} />

      {/* Footer */}
      <footer className="w-full bg-blue-600 text-white py-6 text-center mt-20">
        <code>LiveBridgeDonor © 2024</code>
        <p className="mt-2 text-sm">All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
