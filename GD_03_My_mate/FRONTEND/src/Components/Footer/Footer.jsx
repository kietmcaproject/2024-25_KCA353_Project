import React from "react";
import { NavLink } from "react-router-dom";
import './footer.css'

const Footer = () => {
  return (
    <div>
      <div className="container">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <NavLink className="nav-link px-2 text-body-secondary" to="/feed" >Home</NavLink>
            <li className="nav-item">
              <a href="/features" className="nav-link px-2 text-body-secondary">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="/pricing" className="nav-link px-2 text-body-secondary">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="/faq" className="nav-link px-2 text-body-secondary">
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link px-2 text-body-secondary">
                About
              </a>
            </li>
          </ul>
          <p className="text-center text-body-secondary">© 2024 Company, Inc</p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
