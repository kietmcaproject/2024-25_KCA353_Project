import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import {toast } from 'react-hot-toast';
import { remove } from '../redux/slice/cartslice';
import qrCode from "../qrcode.jpeg"; // Replace with the correct path to your QR code image

function PaymentUI() {

    const { cart } = useSelector((state) => state);
    const dispatch=useDispatch();

    function handleclick(){
        cart.forEach((item) => {
            dispatch(remove(item.id));
        });
        toast.success("Success")
    }
    
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Make a Payment</h2>
        
        <img
          src={qrCode}
          alt="QR Code"
          className="w-48 h-48 mx-auto mb-4 border border-gray-300 rounded-md"
        />
        
        <p className="text-gray-600 mb-6">
          Scan the QR code with your Google Pay or compatible UPI app to make a payment.
        </p>
        
        <NavLink to="/order-summary">
          <button 
           onClick={handleclick}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition duration-300">
            Confirm Payment
          </button>
        </NavLink>

        <p className="mt-4 text-gray-500 text-sm">
          After completing the payment, please click "Confirm Payment" to proceed.
        </p>
      </div>
    </div>
  );
}

export default PaymentUI;
