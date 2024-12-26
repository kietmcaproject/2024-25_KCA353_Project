import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css";

function Annamitra() {
  const navigate = useNavigate();

  useEffect(() => {
    const typeWriter = (text, i, fnCallback) => {
      if (i < text.length) {
        document.getElementById("typingText").innerHTML =
          text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

        setTimeout(() => {
          typeWriter(text, i + 1, fnCallback);
        }, 100);
      } else if (typeof fnCallback === "function") {
        setTimeout(fnCallback, 700);
      }
    };

    // Start the typing effect on component mount
    const text = "Make a Difference, One Meal at a Time.";
    typeWriter(text, 0, () => {});
  }, []);

  return (
    <div className="storage-section">
      <div className="leftsection">
        <img
          className=""
          src="/assets/images/side_image.png"
          alt="Food Donation Image"
        />
      </div>
      <div className="rightsection">
        <h1
          id="typingText"
          className="h1-line-height"
          style={{ fontSize: "50px" }}
        ></h1>
        <br />
        <p>
          Join us in fighting hunger and food insecurity by bridging the gap
          between surplus food and those in need. Together, we can make a
          difference one meal at a time
          <br />
          <br />
          Your contribution matters; let's create a world where no one goes to
          bed hungry.
        </p>
        <br />
        <br />
        <div className="bottom-buttons home-bottom">
          <button
            className="button-main"
            onClick={() => {
              navigate("/Signup");
            }}
          >
            <span>Sign Up</span>
          </button>
          &nbsp;&nbsp;
          <button
            className="button-main"
            onClick={() => {
              navigate("/Login");
            }}
          >
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Annamitra;
