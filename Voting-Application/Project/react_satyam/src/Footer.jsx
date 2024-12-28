import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-1">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-bold">Course Voting System</h3>
          <p className="text-sm">Empowering every voice through voting.</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/profile.php?id=100015204227714&mibextid=ZbWKwL" target='_blank' className="text-gray-400 hover:text-white transition duration-300" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>Facebook
          </a>
        
          <a href="https://instagram.com/satyamsingh_up_0001?igshid=OGQ5ZDc2ODk2ZA==" target='_blank' className="text-gray-400 hover:text-white transition duration-300"aria-label="Instagram">
            <i className="fab fa-instagram"></i>|| Instagram ||
          </a>
          <a href="https://www.linkedin.com/in/satyam2321/" target='_blank' className="text-gray-400 hover:text-white transition duration-300"aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>LinkedIn
          </a>
        </div>
        <div className="mt-4 md:mt-0 text-sm text-gray-400">
          &copy; 2024 Course Voting System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
