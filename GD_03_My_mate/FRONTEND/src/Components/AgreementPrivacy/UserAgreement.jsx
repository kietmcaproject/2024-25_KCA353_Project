import React from "react";
import "./AgreementPrivacy.css"; // Add custom styling if needed
import { Link } from "react-router-dom";

const UserAgreement = () => {
  return (
    <div className="user-agreement-container">
      <h1>MyMate User Agreement</h1>
      <p>Last Updated: November 20, 2024</p>
      <section>
        <h2>Introduction</h2>
        <p>
          Welcome to MyMate! By accessing or using our platform, you agree to
          comply with and be bound by this User Agreement. Please read it
          carefully.
        </p>
      </section>
      <section>
        <h2>Eligibility</h2>
        <p>
          You must be at least 18 years old to use MyMate. By using this
          platform, you confirm that you meet this age requirement.
        </p>
      </section>
      <section>
        <h2>Use of Services</h2>
        <p>
          You agree to use MyMate in compliance with all applicable laws and
          regulations. Unauthorized use of the platform may result in
          termination of your account.
        </p>
      </section>
      <section>
        <h2>Termination</h2>
        <p>
          MyMate reserves the right to suspend or terminate your access to the
          platform at any time, with or without notice, for any reason.
        </p>
      </section>
      <section>
        <h2>Modifications</h2>
        <p>
          We may update this User Agreement from time to time. Continued use of
          the platform indicates your acceptance of any changes.
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

export default UserAgreement;
