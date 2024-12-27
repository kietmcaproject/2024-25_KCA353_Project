import axios from 'axios';
import { Plus } from 'lucide-react'
import React from 'react'

const ShareItemBox = (props) => {

    //this is coming from product's data.
    const { UserID, _id } = props.productData[0];

    let userData = localStorage.getItem('userData');

    userData = JSON.parse(userData);

    const LoggedInUserID = userData ? userData.user._id : -1;

    const fileInputRef = React.useRef(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    function checkLogin() {
        if (userData === null) {
            alert("Please login to share your item.")
            window.location.href = '/login';
        }
    }

    checkLogin();

    //Send the shared data to backend.
    function sendSharedImageToBackend(fileData) {
        const formData = new FormData();

        // Append the file and additional data
        formData.append("file", fileData); // Add the file
        formData.append("productUploadedBy", UserID);
        formData.append("photoUploadedBy", LoggedInUserID);
        formData.append("productID", _id);

        // Make an HTTP POST request
        axios.post("http://localhost:3000/upload_photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                console.log("Response from backend:", response.data);

                if (response.status == 200) {
                    alert("File uploaded successfully!");
                    props.setShareFlag(true);

                    props.toggleShareBox()

                }
            })
            .catch((err) => {
                console.error("Error uploading file:", err);
            });
    }


    return (
        <div
            className='mt-10 rounded-lg bg-gray-50 p-10 border-dashed border-spacing-10 border border-black flex items-center justify-center hover:bg-gray-300 cursor-pointer'
            onClick={handleClick}
        >
            <Plus />
            <h1 className='ml-3'>Share Your Item</h1>
            <form id="form">
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            sendSharedImageToBackend(e.target.files[0]);
                        } else {
                            alert("Please select a file.");
                        }
                    }}
                />
            </form>
        </div>
    );
}

export default ShareItemBox;