import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import "../styles/forms.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Component() {
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [userPassword, setUserPassword] = useState();
    const [profilePicture, setProfilePicture] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [currentCategory, setCurrentCategory] = useState("Personal Info");
    const navigate = useNavigate();

    useEffect(() => {
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
                setId(data.user._id);
                setName(data.user.name);
                setEmail(data.user.email);
                setPhone(data.user.mobileno);
                setAddress(data.user.address);
                setUsername(data.user.username);
                setPassword(data.user.password);
                setUserPassword(data.user.password);
                setProfilePicture(data.user.profilePicture);
            } catch (error) {
                navigate("/Annamitra");
                window.alert("Please Login or SignUp");
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (selectedFile) {
            handleFileUpload();
        }
    }, [selectedFile]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("oldPfp", profilePicture);

        try {
            const response = await fetch(
                `${BASE_URL}/api/profile/upload-profile-picture`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to upload profile picture");
            }
            const result = await response.json();
            setProfilePicture(result.profilePicture);
            window.location.reload();
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        }
    };

    function handleRemovePfp() {
        try {
            const response = fetch(
                `${BASE_URL}/api/profile/delete-profile-picture`,
                {
                    method: "DELETE",
                    body: JSON.stringify({ profilePicture, id }),
                    headers: {
                        "Content-type": "application/json",
                        authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            window.location.reload();
            if (!response.ok) {
                throw new Error("Failed to delete profile picture");
            }
        } catch (error) {
            console.error("Error removing profile picture:", error);
        }
    }

    function handleClick(element) {
        setCurrentCategory(element);
    }

    const handleLogout = () => {
        localStorage.setItem("token", "");
        navigate("/Annamitra");
        window.location.reload();
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/auth/update-profile`,
                {
                    method: "PUT",
                    headers: {
                        authorization:
                            "Bearer " + localStorage.getItem("token"),
                        user_id: id,
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        username,
                        address,
                        password,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not Ok");
            }
            const data = await response.json();
            window.location.reload();
            alert(data.message);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/auth/delete-account`,
                {
                    method: "DELETE",
                    headers: {
                        authorization:
                            "Bearer " + localStorage.getItem("token"),
                        user_id: id,
                    },
                    body: JSON.stringify({
                        enteredpassword: password,
                        originalpassword: userPassword,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not Ok");
            }
            const data = await response.json();
            navigate("/Annamitra");
            window.location.reload();
            alert(data.message);
        } catch (error) {
            navigate("/Annamitra");
            window.location.reload();
        }
    };

    return (
        <div className="profile-settings">
            <div className="left-section">
                <div className="image">
                    <img
                        onClick={() =>
                            document.getElementById("inputImage").click()
                        }
                        src={`${BASE_URL}${profilePicture}`}
                        alt="profile"
                        onError={(e) => {
                            e.target.src =
                                "../public/assets/images/profilepic.jpeg";
                        }}
                    />
                    <input
                        id="inputImage"
                        style={{ display: "none" }}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <button className="btns-main" onClick={handleRemovePfp}>
                        Remove
                    </button>
                </div>
                <div className="categories">
                    <div
                        className={`compo ${
                            currentCategory === "Personal Info" ? "active" : ""
                        }`}
                        onClick={() => {
                            handleClick("Personal Info");
                        }}
                    >
                        <div className="rect"></div>
                        <div className="items">Personal Details</div>
                    </div>
                    <hr />
                    <div
                        className={`compo ${
                            currentCategory === "Address" ? "active" : ""
                        }`}
                        onClick={() => {
                            handleClick("Address");
                        }}
                    >
                        <div className="rect"></div>
                        <div className="items">Address</div>
                    </div>
                    <hr />
                    <div
                        className={`compo ${
                            currentCategory === "Change Password"
                                ? "active"
                                : ""
                        }`}
                        onClick={() => {
                            handleClick("Change Password");
                        }}
                    >
                        <div className="rect"></div>
                        <div className="items">Password Update</div>
                    </div>
                    <hr />
                    <div
                        className={`compo ${
                            currentCategory === "Delete Account" ? "active" : ""
                        }`}
                        onClick={() => {
                            handleClick("Delete Account");
                        }}
                    >
                        <div className="rect"></div>
                        <div className="items">Delete Account</div>
                    </div>
                    <hr />
                </div>
                <div className="logout">
                    <button className="btns-main" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            <div className="right-section">
                <div
                    className={`category-detail ${
                        currentCategory === "Personal Info" ? "current" : ""
                    }`}
                >
                    <div className="cat-head">Personal Details</div>
                    <div className="main-section">
                        <div className="form-unit">
                            <div className="setting-head">Full Name</div>
                            <input
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                type="text"
                                className="formscontrol"
                                placeholder="Name"
                                defaultValue={name}
                            />
                        </div>
                        <div className="form-unit">
                            <div className="setting-head">Username</div>
                            <input
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                type="text"
                                className="formscontrol"
                                placeholder="Username"
                                defaultValue={username}
                            />
                        </div>
                        <div className="form-unit">
                            <div className="setting-head">Email</div>
                            <input
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                type="text"
                                className="formscontrol"
                                placeholder="Email"
                                defaultValue={email}
                            />
                        </div>
                        <div className="form-unit">
                            <div className="setting-head">Phone Number</div>
                            <input
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                type="text"
                                className="formscontrol"
                                placeholder="Phone"
                                defaultValue={phone}
                            />
                        </div>
                    </div>
                    <div className="update-button">
                        <button className="btns-main" onClick={handleUpdate}>
                            Update
                        </button>
                    </div>
                </div>
                <div
                    className={`category-detail ${
                        currentCategory === "Address" ? "current" : ""
                    }`}
                >
                    <div className="cat-head">Address</div>
                    <div className="main-section">
                        <div className="form-unit">
                            <div className="setting-head">Street Address</div>
                            <input
                                onChange={(e) => {
                                    setAddress({
                                        ...address,
                                        street: e.target.value,
                                    });
                                }}
                                type="text"
                                className="formscontrol"
                                placeholder="Street"
                                defaultValue={address?.street}
                            />
                        </div>
                        <div className="form-unit">
                            <div className="setting-head">City</div>
                            <input
                                onChange={(e) => {
                                    setAddress({
                                        ...address,
                                        city: e.target.value,
                                    });
                                }}
                                type="text"
                                className="formscontrol"
                                placeholder="City"
                                defaultValue={address?.city}
                            />
                        </div>
                        <div className="form-unit">
                            <div className="setting-head">Postal Code</div>
                            <input
                                onChange={(e) => {
                                    setAddress({
                                        ...address,
                                        state: e.target.value,
                                    });
                                }}
                                type="text"
                                className="formscontrol"
                                placeholder="State"
                                defaultValue={address?.state}
                            />
                        </div>
                        <div className="form-unit">
                            <div className="setting-head">State</div>
                            <input
                                onChange={(e) => {
                                    setAddress({
                                        ...address,
                                        postalcode: e.target.value,
                                    });
                                }}
                                type="text"
                                className="formscontrol"
                                placeholder="Postal Code"
                                defaultValue={address?.postalcode}
                            />
                        </div>
                        <div className="form-unit">
                            <div className="setting-head">Country</div>
                            <input
                                onChange={(e) => {
                                    setAddress({
                                        ...address,
                                        country: e.target.value,
                                    });
                                }}
                                type="text"
                                className="formscontrol"
                                placeholder="Country"
                                defaultValue={address?.country}
                            />
                        </div>
                    </div>
                    <div className="update-button">
                        <button className="btns-main" onClick={handleUpdate}>
                            Update
                        </button>
                    </div>
                </div>
                <div
                    className={`category-detail ${
                        currentCategory === "Change Password" ? "current" : ""
                    }`}
                >
                    <div className="cat-head">
                        <h1>Change Password</h1>
                    </div>
                    <div className="main-sections">
                        <div className="form-unit">
                            <h4>Current Password</h4>
                            <input
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                type="password"
                                className="formscontrol"
                                placeholder=""
                            />
                        </div>
                        <div className="form-unit">
                            <h4>New Password</h4>
                            <input
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                type="password"
                                className="formscontrol"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="update-button">
                        <button className="btns-main" onClick={handleUpdate}>
                            Update
                        </button>
                    </div>
                </div>
                <div
                    className={`category-detail ${
                        currentCategory === "Delete Account" ? "current" : ""
                    }`}
                >
                    <div className="cat-head">Delete Account</div>
                    <div className="main-section">
                        <div className="form-unit">
                            <div className="setting-head">Enter Password</div>
                            <input
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                type="password"
                                className="formscontrol"
                                placeholder="Enter Password"
                            />
                        </div>
                    </div>
                    <div className="update-button">
                        <button className="btns-main" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
