import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Prelogin.css";

import growth from'./images/growth.jpg'
import online from'./images/online.jpg'
import connection from'./images/connection.jpg'
import contact from'./images/contact.jpg'
import handshake from'./images/handshake.jpg'


const Prelogin = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="landing-container"
    >
      {/* hellllllooooooo */}
      <header className="header"  >
        
        <div style={{display:'flex'}}>
        <Link to="/login" ><button>Login</button></Link>
        <Link to="/register" ><button style={{backgroundColor:'#333'}}>Register</button></Link>
        </div>
      </header>

      

      <motion.section
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="content-section"
      > 
        <img src={growth} alt="" />
        <h2>Why Buy From Us?</h2>
        <p>We offer the best wholesale prices on quality footwear, ensuring your store has the latest trends and reliable products that your customers will love. Our easy ordering process and dedicated customer support make purchasing from us a seamless experience.</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="content-section"
      >
        <img src={online} alt="" />
        <h2>How to Buy From Us?</h2>
        <p>Simply register on our platform, browse through our extensive catalog, and place your orders with just a few clicks. You can track your orders and receive updates directly through our online portal.</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="content-section"
      >
        <img src={connection} alt="" />
        <h2>Why We Are Better?</h2>
        <p>Our commitment to quality, competitive pricing, and excellent customer service sets us apart from the rest. We strive to build lasting relationships with our clients by providing them with the best products and support.</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="content-section"
      >
        <img src={contact} alt="" />
        <h2>Contact Us Online and Offline</h2>
        <p>We are here to support you both online and offline. Reach out to us via our contact page, or visit us at our office to discuss your needs in person. Our team is always ready to assist you.</p>
      </motion.section>
      <div className="button-container">
        <div>
            <h2>Start Your Journey With Us
                Lets Grow Together
            </h2>
            
        </div>
        <img src={handshake} alt="" />

        <div>
        <Link to="/login" ><button>Login</button></Link>
        <Link to="/register" ><button style={{backgroundColor:'#333'}}>Register</button></Link>
        </div>
        <Link to="/contact-us" ><button>Contact Us</button></Link>
      </div>
    </motion.div>
  );
};

export default Prelogin;
