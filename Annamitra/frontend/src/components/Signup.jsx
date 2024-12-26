import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [mobileno, setMobileno] = useState("");
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalcode, setPostalcode] = useState("");
    const [country, setCountry] = useState("");

    const navigate = useNavigate();

    const handleSignup = () => {
        fetch(`${BASE_URL}/api/auth/signup`, {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
                name,
                email,
                mobileno,
                address: {
                    street,
                    city,
                    state,
                    postalcode,
                    country,
                },
            }),
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 403) {
                        window.alert("Username Already Exists");
                        return;
                    }
                }
                return res.json();
            })
            .then((data) => {
                if (data.errors) {
                    alert(data.errors.map((error) => error.msg).join("\n"));
                } else {
                    // Handle successful signup
                    localStorage.setItem("token", data.token);
                    // Redirect or update UI as needed
                    navigate("/Dashboard");
                    window.location.reload();
                }
            });
    };

    return (
        <div className="storage-section">
            <div className="leftsection">
                <img
                    src="/assets/images/form_image.png"
                    alt="Food Donation Image"
                    style={{ maxWidth: "94%" }}
                />
            </div>
            <div className="rightsection">
                <h1 className="heading" style={{ fontSize: "45px" }}>
                    Sign Up
                </h1>
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
                            type="password"
                            placeholder="Password"
                            className="formscontrol"
                            id="inputPassword"
                        />
                    </div>
                    <div className="formsgroup">
                        <label htmlFor="inputName">Name</label>
                        <input
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            label="Name"
                            placeholder="Name"
                            className="formscontrol"
                            id="inputName"
                        />
                    </div>
                    <div className="formsgroup">
                        <label htmlFor="inputEmail">Email</label>
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            label="Email"
                            type="email"
                            placeholder="Email"
                            className="formscontrol"
                            id="inputEmail"
                        />
                    </div>
                    <div className="formsgroup">
                        <label htmlFor="inputPhoneNumber">Mobile No</label>
                        <input
                            onChange={(e) => {
                                setMobileno(e.target.value);
                            }}
                            label="Mobile No"
                            placeholder="Mobile No"
                            className="formscontrol"
                            id="inputPhoneNumber"
                        />
                    </div>
                    <div className="formsgroup">
                        <label htmlFor="inputAddress">Address</label>
                        <input
                            onChange={(e) => {
                                setStreet(e.target.value);
                            }}
                            placeholder="Address"
                            className="formscontrol"
                            id="inputAddress"
                        />
                    </div>
                    <div className="formsrow">
                        <div className="formsgroup">
                            <label htmlFor="inputCity">City</label>
                            <input
                                onChange={(e) => {
                                    setCity(e.target.value);
                                }}
                                label="City"
                                placeholder="City"
                                className="formscontrol"
                                id="inputCity"
                            />
                        </div>
                        <div className="formsgroup">
                            <label htmlFor="inputState">State</label>
                            <input
                                onChange={(e) => {
                                    setState(e.target.value);
                                }}
                                label="State"
                                placeholder="State"
                                className="formscontrol"
                                id="inputState"
                            />
                        </div>
                        <div className="formsgroup">
                            <label htmlFor="inputZip">Zip Code</label>
                            <input
                                onChange={(e) => {
                                    setPostalcode(e.target.value);
                                }}
                                label="Postal Code"
                                placeholder="Zip Code"
                                className="formscontrol"
                                id="inputZip"
                            />
                        </div>
                    </div>
                    <div className="formsgroup">
                        <label htmlFor="inputCountry">Country</label>
                        <input
                            onChange={(e) => {
                                setCountry(e.target.value);
                            }}
                            label="Country"
                            placeholder="Country"
                            className="formscontrol"
                            id="inputCountry"
                        />
                    </div>
                    <div className="bottom-buttons">
                        <button className="button-main" onClick={handleSignup}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
