import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        username: username,
        password: password,
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errorMessage) {
          alert(data.errorMessage);
        } else {
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
          window.location.reload();
        }
      });
  };

  return (
    <div className="storage-section">
      <div className="leftsection">
        <img src="/assets/images/form_image.png" alt="Food Donation Image" />
      </div>
      <div className="rightsection">
        <h1 className="h1-line-height" style={{ fontSize: "40px" }}>
          Welcome Back. Log In Below
        </h1>
        <br />
        <div className="input-form">
          <div className="formsgroup">
            <label htmlFor="inputUserName">Username</label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              label="inputUserName"
              placeholder="Username"
              className="formscontrol"
              id="inputUserName"
            />
          </div>
          <div className="formsgroup">
            <label htmlFor="inputPassword">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="formscontrol"
              id="inputPassword"
            />
            <br />
            <br />
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => {
                setShowPassword(!showPassword);
              }}
            />
            <label htmlFor="showPassword">Show Password</label>
            <br />
            <a href="/signup">Don't have an account.</a>
          </div>
          <div className="bottom-buttons">
            <button className="button-main" onClick={handleLogin}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
