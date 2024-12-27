import React from 'react'
import { RazorPayOptions } from '../../../RazorPayOptions';
import Razorpay from 'razorpay'

const RazorpayComponent = ({ productData }) => {

    console.log(productData.Price)

    var rzp1 = new Razorpay(RazorPayOptions(productData.Price));

    function openRazorpay() {
        rzp1.open();
    }

    return (
        <div>
            <button onClick={openRazorpay}>Pay Now</button>
        </div>
    )
}

export default RazorpayComponent