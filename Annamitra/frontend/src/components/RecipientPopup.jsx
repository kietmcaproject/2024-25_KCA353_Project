import React, { useState, useEffect } from "react";
import "../styles/confirmation.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Confirmation({ element, onClose }) {
    const [donor, setDonor] = useState({});
    const [user, setUser] = useState({});
    const [showContactInfo, setShowContactInfo] = useState(false);

    useEffect(() => {
        const fetchDonor = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/auth/get-user`, {
                    method: "GET",
                    headers: {
                        authorization:
                            "Bearer " + localStorage.getItem("token"),
                        user_id: element.donor_id,
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setDonor(data.user);
            } catch (error) {
                console.error("Error in fetching:", error);
            }
        };

        fetchDonor();

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
                console.error("Error in fetching:", error);
            }
        };

        fetchUser();
    }, []);

    async function handleRecieve() {
        setShowContactInfo(true);
        try {
            const response = await fetch(
                `${BASE_URL}/api/match/match-recipient`,
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
                        addressTo: user.address,
                        recipient_id: user._id,
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
                <div className="serves">Serves: {element.serves}</div>
                <div className="date">
                    Date: {new Date(element.date).toLocaleDateString("en-GB")}
                </div>
                <div className="addresspro">
                    Address: {element.addressFrom.city},
                    {element.addressFrom.postalcode}
                </div>
                <div className="category">Category: {element.category}</div>
            </div>
            <div className="confirmation">
                <div className="user-info">
                    <h2>From: {donor.username}</h2>
                    <p>
                        {element.addressFrom.street}, {element.addressFrom.city}
                        , {element.addressFrom.state},{" "}
                        {element.addressFrom.postalcode},{" "}
                        {element.addressFrom.country}
                    </p>
                </div>
                <div className="proceed">
                    <h3>
                        {showContactInfo
                            ? "Conguratulations! Food will be delivered soon."
                            : "Are you sure you would like to proceed?"}
                    </h3>
                    <div className="button-container">
                        <button
                            className={`button-main ${
                                showContactInfo ? "hidden" : ""
                            }`}
                            onClick={handleRecieve}
                        >
                            Recieve
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
                    Mobile No:{donor.mobileno} <br />
                    Email Id : {donor.email}
                </div>
            </div>
        </div>
    );
}
