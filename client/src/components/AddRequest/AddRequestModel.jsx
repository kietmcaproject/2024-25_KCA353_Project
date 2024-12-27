import React, { useEffect, useState } from 'react'
import { toast, Bounce } from 'react-toastify';
import { nanoid } from 'nanoid';
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react"

const AddRequestModel = () => {

    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);

    const [Title, setTitle] = React.useState('');
    const [Description, setDescription] = React.useState('');
    const [Price, setPrice] = React.useState('');
    const [Category, setCategory] = useState('Clothes');

    const [isTermsOpen, setIsTermsOpen] = useState(false);

    const toggleTerms = () => setIsTermsOpen(!isTermsOpen);


    const sendData = async () => {
        // send the data to the server.

        console.log('Sending Data');

        const createURL = new URL('http://localhost:3000/addRequest?');
        const params = new URLSearchParams(createURL.search);

        //Creating a short ID.
        const shortID = nanoid(5);

        //Adding the data to the URL.
        params.append('Title', Title);
        params.append('Description', Description);
        userData ? params.append('UserID', userData.user._id) : params.append('UserID', "null");
        params.append("CreatedAt", new Date().toISOString());
        params.append('Price', Price);
        params.append("UserFirstName", userData.user.FirstName);
        params.append("UserLastName", userData.user.LastName)
        params.append('Category', Category);
        params.append('ShortID', shortID);

        let request = await fetch(createURL + params.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (request.ok) {
            console.log('Jugaad Request Sent');

            //Show the toast.
            dataAddedToast();
        } else {
            console.log('Jugaad Request Failed');

            //Show the toast.
            dataNotAddedToast();
        }
    }


    //Toast function.
    const dataAddedToast = () => {
        toast.success("Congrats! Your request has been added 💌", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    const dataNotAddedToast = () => {
        toast.error("Oops! Something went wrong 😢", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }


    return (

        <div>

            <div className="flex items-center justify-center p-8">
                <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Request An Item</h2>
                        <p className="text-center text-gray-600 mb-6">Please fill out the details below to add a Jugaad Request 👇</p>
                        <form className="space-y-4" onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 flex">Title <pre className='text-red-700'>*</pre> </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={Title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter the title of your request" required
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="flex text-sm font-medium text-gray-700 mb-1">Describe your request <pre className='text-red-700'>*</pre></label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={Description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Provide details about your request" required
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="price" className="flex text-sm font-medium text-gray-700 mb-1">Price <pre className='text-red-700'>*</pre></label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={Price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter the price" required
                                />
                            </div>
                            <div>
                                <label htmlFor="category" className="flex text-sm font-medium text-gray-700 mb-1">Category <pre className='text-red-700'>*</pre></label>
                                <select
                                    id="category"
                                    name="category"
                                    defaultValue={Category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="Clothes">Clothes</option>
                                    <option value="Books">Books</option>
                                    <option value="Daily Use">Daily Use</option>
                                    <option value="Projects">Projects</option>
                                    <option value="Car">Car</option>
                                    <option value="Bike">Bike</option>
                                    <option value="PG Rooms">PG Rooms</option>
                                </select>
                            </div>
                            <div>
                                <button type='submit'
                                    className="max-w-screen-md bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out" onClick={() => {
                                        //When the user clicks on the submit button.

                                        if (userData == null) {
                                            alert('Please login to add a request');
                                        } else {
                                            if (Title === '' || Description === '' || Price === '' || Category === '') {
                                                alert('Please fill out all the fields');
                                                return;
                                            }


                                            //Send the data if it is filled properly.
                                            sendData();
                                        }

                                    }}>
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* User Terms and Conditions Aggrement */}

            <div className="mb-8">
                <div
                    className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg overflow-hidden"
                    role="region"
                    aria-labelledby="terms-title"
                >
                    <button
                        onClick={toggleTerms}
                        className="w-full p-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        aria-expanded={isTermsOpen}
                        id="terms-title"
                    >
                        <div className="flex items-center">
                            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                            <h2 className="text-lg font-semibold text-yellow-800">Important: Keep this in mind while requesting an item.</h2>
                        </div>
                        {isTermsOpen ? (
                            <ChevronUp className="h-5 w-5 text-yellow-600" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-yellow-600" />
                        )}
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isTermsOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="p-4 space-y-4 text-yellow-800">
                            <section>
                                <h3 className="font-semibold">Accuracy of Information</h3>
                                <p>By submitting this request, you confirm that all information provided (title, description, price, etc.) is accurate to the best of your knowledge. False or misleading information may result in the removal of your listing.</p>
                            </section>
                            <section>
                                <h3 className="font-semibold">No Offensive or Illegal Products</h3>
                                <p>You agree not to request products that are illegal, harmful, offensive, or prohibited by local laws. Such listings will be removed, and your account may be suspended.</p>
                            </section>
                            <section>
                                <h3 className="font-semibold">No Responsibility for Fulfillment</h3>
                                <p>Project Jugaad only serves as a platform for requesting and listing products. We do not guarantee that your request will be fulfilled by another user or the availability of any product.</p>
                            </section>
                            <section>
                                <h3 className="font-semibold">Disputes Between Users</h3>
                                <p>Any disputes or disagreements that arise from transactions must be resolved between the involved users. Project Jugaad team is not responsible for mediating or resolving disputes.</p>
                            </section>
                            <section>
                                <h3 className="font-semibold">User Responsibility</h3>
                                <p>You are solely responsible for any interactions or transactions resulting from your request. Ensure proper communication and verification when dealing with other users.</p>
                            </section>
                            <section>
                                <h3 className="font-semibold">Removal of Requests</h3>
                                <p>Project Jugaad reserves the right to remove any product request at its discretion if it violates our terms, appears suspicious, or is flagged by other users.</p>
                            </section>
                            <section>
                                <h3 className="font-semibold">Adherence to Legal Guidelines</h3>
                                <p>All transactions must comply with local laws. Any illegal activities, such as the sale of prohibited items, will result in immediate account suspension.</p>
                            </section>
                            <section>
                                <h3 className="font-semibold">Non-Commercial Use</h3>
                                <p>Project Jugaad is intended for non-commercial use, focused on sharing and renting everyday essentials. Any commercial use of the platform will lead to account termination.</p>
                            </section>
                            <section>
                                <h3 className="font-semibold">Limited Liability</h3>
                                <p>Project Jugaad shall not be held responsible for any monetary loss, fraud, or damages related to transactions made on the platform.</p>
                            </section>
                            <section>
                                <h3 className="font-semibold">Listing Fees</h3>
                                <p>Currently, adding a request is free of charge, but Project Jugaad reserves the right to introduce fees in the future with proper notification.</p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRequestModel