import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function RequestList() {
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [toServe, setToServe] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalcode, setPostalcode] = useState("");
    const [country, setCountry] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        setCategory(category);
        setSelectedCategory(category);
    };

    const handleRequest = () => {
        fetch(`${BASE_URL}/api/forms/new-request`, {
            method: "POST",
            body: JSON.stringify({
                category,
                description,
                toServe,
                addressTo: {
                    street,
                    city,
                    state,
                    postalcode,
                    country,
                },
            }),
            headers: {
                "Content-type": "application/json",
                authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data) {
                    window.alert("Rquest for food was succesfully made");
                    navigate("/recipients-list");
                }
            });
    };

    return (
        <div>
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
                        Request
                    </h1>
                    <br />
                    <div className="input-form">
                        <div className="formsgroup">
                            <label htmlFor="inputCategory">
                                Category Of Food
                            </label>
                            <br />
                            <br />
                            <div className="formsrow">
                                <span
                                    className={`formsgroup col-md-4 ${
                                        selectedCategory === "Cooked Food"
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleCategoryClick("Cooked Food")
                                    }
                                >
                                    <img
                                        style={{ width: 100 }}
                                        src="/assets/images/cookedfood.png"
                                        alt="Cooked Food"
                                    />
                                    <br />
                                    <span>Cooked Food</span>
                                </span>
                                <span
                                    className={`formsgroup col-md-4 ${
                                        selectedCategory === "UnCooked Food"
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleCategoryClick("UnCooked Food")
                                    }
                                >
                                    <img
                                        style={{ width: 100 }}
                                        src="/assets/images/rawfood.jpg"
                                        alt="Un-Cooked Food"
                                    />
                                    <br />
                                    <span>Uncooked Food</span>
                                </span>
                                <span
                                    className={`formsgroup col-md-4 ${
                                        selectedCategory === "Packed Food"
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleCategoryClick("Packed Food")
                                    }
                                >
                                    <img
                                        style={{ width: 100 }}
                                        src="/assets/images/packedfood.png"
                                        alt="Packed Food"
                                    />
                                    <br />
                                    <span>Packed Food</span>
                                </span>
                            </div>
                        </div>
                        <div className="formsgroup">
                            <label htmlFor="inputDescription">
                                Describe Your Requirements
                            </label>
                            <input
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                placeholder="Description"
                                className="formscontrol"
                                id="inputDescription"
                            />
                        </div>
                        <div className="formsgroup">
                            <label htmlFor="inputToServe">
                                No. Of People to be served
                            </label>
                            <input
                                onChange={(e) => {
                                    setToServe(e.target.value);
                                }}
                                placeholder="No. of People"
                                className="formscontrol"
                                id="inputToServe"
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
                    </div>
                    <div className="bottom-buttons">
                        <button className="button-main" onClick={handleRequest}>
                            Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestList;
