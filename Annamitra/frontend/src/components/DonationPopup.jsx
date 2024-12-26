import React, { useState, useEffect } from "react";
import "../styles/confirmation.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Confirmation({ element, onClose }) {
    const [recipient, setRecipient] = useState({});
    const [user, setUser] = useState({});
    const [showContactInfo, setShowContactInfo] = useState(false);

    useEffect(() => {
        const fetchRecipient = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/auth/get-user`, {
                    method: "GET",
                    headers: {
                        authorization:
                            "Bearer " + localStorage.getItem("token"),
                        user_id: element.recipient_id,
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setRecipient(data.user);
            } catch (error) {
                window.alert("Please Login or SignUp");
                navigate("/Annamitra");
                window.location.reload();
            }
        };

        fetchRecipient();

        const fetchUser = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/api/auth/user-details`,
                    {
                        method: "GET",
                        headers: {
                            authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setUser(data.user);
            } catch (error) {
                window.alert("Please Login or SignUp");
                navigate("/Annamitra");
                window.location.reload();
            }
        };

        fetchUser();
    }, []);

    async function handleDonate() {
        setShowContactInfo(true);
        try {
            const response = await fetch(
                `${BASE_URL}/api/match/match-donation`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization:
                            "Bearer " + localStorage.getItem("token"),
                        request_id: element._id,
                    },
                    body: JSON.stringify({
                        ...element,
                        addressFrom: user.address,
                        donor_id: user._id,
                        completed: true,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            console.error("Error in fetching:", error);
        }
    }

    return (
        <div className="popup">
            <div className="product-container">
                <div className="product-image-container">
                    <img
                        className="product-image"
                        src="/assets/images/mapapi.png"
                        style={{ width: "100%" }}
                        alt=""
                    />
                </div>
                <div className="description">
                    Description: {element.description}
                </div>
                <div className="serves">To Serve: {element.toServe}</div>
                <div className="date">
                    Date: {new Date(element.date).toLocaleDateString("en-GB")}
                </div>
                <div className="addresspro">
                    Address: {element.addressTo.city},
                    {element.addressTo.postalcode}
                </div>
                <div className="category">Category: {element.category}</div>
            </div>
            <div className="confirmation">
                <div className="user-info">
                    <h2>By: {recipient.username}</h2>
                    <p>
                        {element.addressTo.street}, {element.addressTo.city},{" "}
                        {element.addressTo.state},{" "}
                        {element.addressTo.postalcode},{" "}
                        {element.addressTo.country}
                    </p>
                </div>
                <div className="proceed">
                    <h3>
                        {showContactInfo
                            ? "Thank you for your Donation!"
                            : "Are you sure you would like to proceed?"}
                    </h3>
                    <div className="button-container">
                        <button
                            className={`button-main ${
                                showContactInfo ? "hidden" : ""
                            }`}
                            onClick={handleDonate}
                        >
                            Donate
                        </button>
                        <button className="button-main" onClick={onClose}>
                            Go Back
                        </button>
                    </div>
                </div>
                <div
                    className={`contact-info ${
                        showContactInfo ? "" : "hidden"
                    }`}
                >
                    For more information, contact here :- <br />
                    Mobile No:{recipient.mobileno} <br />
                    Email Id : {recipient.email}
                </div>
            </div>
        </div>
    );
}
