import React from "react";
import { Link } from "react-router-dom";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-dark text-white  p-[80px] ">
      <div className="flex justify-between items-center  text-center">
        <div className="flex flex-col">
          <Link className="text-xl">About</Link>
          <Link>Deals</Link>
          <Link>Contact</Link>
          <Link>FAQs</Link>
          <Link>Terms & Conditions</Link>
          <Link>Privacy Policy</Link>
        </div>
        <div className="flex flex-col ">
          <Link>About</Link>
          <Link>Deals</Link>
          <Link>Contact</Link>
          <Link>FAQs</Link>
          <Link>Terms & Conditions</Link>
          <Link>Privacy Policy</Link>
        </div>
        <div className="flex flex-col">
          <Link>About</Link>
          <Link>Deals</Link>
          <Link>Contact</Link>
          <Link>FAQs</Link>
          <Link>Terms & Conditions</Link>
          <Link>Privacy Policy</Link>
        </div>
        <div className="flex flex-col">
          <Link>About</Link>
          <Link>Deals</Link>
          <Link>Contact</Link>
          <Link>FAQs</Link>
          <Link>Terms & Conditions</Link>
          <Link>Privacy Policy</Link>
        </div>
      </div>
      <hr className="my-[30px]" />

      <div className="flex justify-between ">
        <p>Copyright©2024 driveondemand.com</p>
        <div className="flex justify-center gap-5">
          <Link className="text-3xl hover:text-medium transition duration-300 ">
            <FaSquareXTwitter />
          </Link>
          <Link className="text-3xl hover:text-medium transition duration-300">
            <FaFacebookSquare />
          </Link>
          <Link className="text-3xl hover:text-medium transition duration-300 ">
            <FaSquareInstagram />
          </Link>
          <Link className="text-3xl hover:text-medium transition duration-300">
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
