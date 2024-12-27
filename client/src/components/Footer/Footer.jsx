import React from 'react'
import './Footer.css'
import assets from '../../assets/assets'

const Footer = () => {
  return (
    <div className="footer" id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo_white} alt="logo" />
          <p>Project Jugaad is a unique platform developed to bring convenience and collaboration to the KIET community. Designed specifically for students and faculty, it enables the safe and easy sharing of everyday essentials. Whether you're looking to borrow something or lend a helping hand, Project Jugaad fosters a sense of community and resourcefulness.</p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook logo" />
            <img src={assets.twitter_icon} alt="Twitter logo" />
            <img src={assets.linkedin_icon} alt="LinkedIn logo" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>Quick Links</h2>
          <ul>
            <li>Home</li>
            <li>Why Us</li>
            <li>Profile</li>
            <li>About Us</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>Address: 1234 Street Name, City Name, United States</li>
            <li>Phone: +1234567890</li>
            <li>Email: piyush@projectjugaad.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} Project Jugaad. Made with <span role="img" aria-label="heart emoji">❤️</span> by Jugaad Team
      </p>
    </div>
  )
}

export default Footer