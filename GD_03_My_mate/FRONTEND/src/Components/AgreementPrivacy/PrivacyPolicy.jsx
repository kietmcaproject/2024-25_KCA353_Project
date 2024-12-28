import React from "react";
import "./AgreementPrivacy.css"; // Add custom styling if needed
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>MyMate Privacy Policy</h1>
      <p>Last Updated: November 20, 2024</p>
      <section>
        <h2>Introduction</h2>
        <p>
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your information when you use MyMate.
        </p>
      </section>
      <section>
        <h2>Information We Collect</h2>
        <p>
          We collect information that you provide directly, such as your name,
          email address, and profile details. Additionally, we may collect
          usage data to improve the platform.
        </p>
      </section>
      <section>
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To provide and maintain the MyMate platform</li>
          <li>To improve user experience</li>
          <li>To communicate with you about updates and offers</li>
          <li>To ensure compliance with legal obligations</li>
        </ul>
      </section>
      <section>
        <h2>Sharing Your Information</h2>
        <p>
          We do not sell your personal information. We may share your
          information with trusted partners or as required by law.
        </p>
      </section>
      <section>
        <h2>Your Rights</h2>
        <p>
          You have the right to access, modify, or delete your information. For
          any requests, please contact us at <a href="mailto:support@mymate.com">support@mymate.com</a>.
        </p>
      </section>
      <section>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Your continued
          use of the platform signifies your acceptance of the updated terms.
        </p>
      </section>
      <div className="button-container" style={{"display":"flex","justifyContent":"center"}}>
        <Link to={"/"}>
          <button className="btn btn-secondary">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
