import { X, ShoppingCart, CreditCard, AlertTriangle } from 'lucide-react'
import React, { useState } from 'react'
import RazorpayComponent from './RazorpayComponent';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

const CartComponent = ({ setShowCart, productData, loggedInUserData, imageData }) => {

    // const [showRazorpay, setShowRazorPay] = useState(false);
    console.log(productData[0]._id);

    const paymentHandling = () => {
        // setShowRazorPay(true);

        itemPurchased();

        const data = {
            ProductID: productData[0]._id,
            ProductUploadedBy: productData[0].UserID,
            ImageUploadedBy: imageData.ImageUploadedBy,
            ImageID: imageData._id,
            Amount: productData[0].Price,
            TransactionStatus: 'Success',
            OrderID: 'ORD' + Math.floor(Math.random() * 1000000)
        }

        setTimeout(() => {
            const response = axios.post('http://localhost:3000/orders', data);
            response.then((res) => {
                console.log(res);

                if (res.status == 200) {

                    axios.delete('http://localhost:3000/delete?' + "_id=" + productData[0]._id).then((response) => {
                        console.log(response);
                        // Redirect to home page after 3 seconds
                        window.location.href = '/';
                    }).catch((err) => {
                        console.log(err);
                    });


                }
            })
        }, 3000);

    }

    const itemPurchased = () => {
        toast("Payment Succeeded✅", {
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
        <div id='cart' className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className='font-bold text-3xl text-gray-800 flex items-center'>
                            <ShoppingCart className="mr-3" size={28} />
                            Your Cart
                        </h2>
                        <button
                            onClick={() => setShowCart(false)}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Close cart"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    <div className="bg-gray-100 rounded-xl p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    src={imageData.ImageURL}
                                    alt='Uploaded Image'
                                    className='w-24 h-24 rounded-lg object-cover shadow-md cursor-pointer transition-transform hover:scale-105'
                                    onClick={() => window.open(imageData.ImageURL, '_blank')}
                                />
                                <div className="ml-4">
                                    <h3 className="font-semibold text-lg text-gray-800">{imageData.PhotoUploadedBy}</h3>
                                    <p className="text-sm text-gray-600">Uploaded at {new Date(imageData.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Item ID:</span>
                            <span className="font-semibold text-gray-800">{productData[0]._id}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Posted By:</span>
                            <span className="font-semibold text-gray-800">{productData[0].UserFirstName} {productData[0].UserLastName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Price:</span>
                            <span className="font-bold text-2xl text-blue-600">Rs. {productData[0].Price.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    Payment once made cannot be refunded without admin permission. Please proceed carefully.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t pt-6">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-medium text-gray-800">Total</span>
                            <span className="text-3xl font-bold text-gray-800">Rs. {productData[0].Price.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center" onClick={paymentHandling}>
                            <CreditCard className="mr-2" size={24} />
                            Proceed to Checkout
                        </button>
                    </div>

                    {/* {showRazorpay && <RazorpayComponent productData={productData[0]} />} */}
                </div>
            </div>
        </div>
    )
}

export default CartComponent