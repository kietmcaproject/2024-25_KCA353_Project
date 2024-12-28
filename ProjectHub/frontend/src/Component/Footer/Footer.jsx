import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import logo1 from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 w-full">
      {/* Main footer container */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:justify-between gap-8">
        {/* Logo section */}
        <div className="flex justify-center lg:justify-start space-x-4">
          <img src={logo1} alt="Logo 1" className="h-12 w-auto" />
        <img src= {logo2} alt="Logo 2" className="h-12 w-auto" />
        </div>

        {/* Navigation and content section */}
        <div className="flex flex-col items-center lg:items-start space-y-6">
          {/* Quick links */}
          <nav>
            <ul className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
              <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/projects" className="hover:text-blue-400 transition-colors">Projects</a></li>
              <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </nav>

          {/* Social icons */}
          <div className="flex items-center space-x-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
               className="hover:text-blue-400 transition-colors">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="hover:text-blue-400 transition-colors">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
               className="hover:text-blue-400 transition-colors">
              <FaGithub className="w-6 h-6" />
            </a>
          </div>

          {/* Developer names */}
          <div className="text-center lg:text-left">
            <p className="text-sm">
              Developed by Ravi Singh, Rashi Vishnoi, Rashmi Mishra, Ryan Goal
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center lg:text-left">
            <p className="text-xs text-gray-400">
              Copyright © {new Date().getFullYear()} - All rights reserved by Project Hub
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;