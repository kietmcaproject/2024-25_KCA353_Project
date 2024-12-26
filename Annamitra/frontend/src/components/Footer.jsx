import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-100 py-6 shadow-lg">
      {/* Logo and Contact Section */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-20">
        {/* Logo */}
        <div
          className="cursor-pointer mb-6 md:mb-0"
          onClick={() => navigate("/dashboard")}
        >
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            className="w-28 h-auto md:w-32"
          />
        </div>

        {/* Contact Section */}
        <div className="text-center md:text-left">
          <p className="text-base md:text-lg font-semibold text-gray-700 mb-4">
            Contact Us:
          </p>
          <ul className="flex gap-4 justify-center md:justify-start">
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/insta.png"
                  alt="Instagram"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/x.png"
                  alt="Twitter"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/linkedin.png"
                  alt="LinkedIn"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              </a>
            </li>
            <li>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=krishagarwal1673@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/gmail.png"
                  alt="Email"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-4 text-xs md:text-sm text-gray-500">
        <p>&#169; 2024 All Rights Reserved</p>
      </div>
    </footer>
  );
}
