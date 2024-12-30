import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CartItem from "../components/cartitem";

function Cart() {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate the total amount of items in the cart
  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = cart.reduce((acc, curr) => acc + parseFloat(curr.price || 0), 0);
      setTotalAmount(total);
    };
    calculateTotalAmount();
  }, [cart]);

  return (
    <div className="mb-10 px-4">
      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row flex-wrap justify-center max-w-[1300px] mx-auto gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-[60%] flex flex-col p-4 bg-white shadow-md rounded-lg border border-gray-200">
            {cart.map((item, index) => (
              <CartItem key={item.id} item={item} itemindex={index} />
            ))}
          </div>

          {/* Summary Section */}
          <div className="w-full lg:w-[35%] mt-5 lg:mt-0 flex flex-col bg-[#FFF6E5] shadow-lg rounded-lg p-6 border border-[#FFC480]">
            <div className="flex flex-col h-full justify-between gap-6">
              <div className="text-center">
                <h2 className="font-bold text-2xl text-green-700">Your Cart</h2>
                <h3 className="font-bold text-4xl text-green-600 mt-2">Summary</h3>
                <p className="text-gray-700 mt-4">
                  <span className="font-semibold text-lg">Total Items: {cart.length}</span>
                </p>
              </div>
              <div className="mt-6 text-center">
                <p className="text-xl font-bold text-green-700">
                  Total Amount: <span className="text-green-600">Rs. {totalAmount.toFixed(2)}</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                <NavLink to="/payment">
                  <button className="bg-[#FFA726] hover:bg-[#FB8C00] text-white px-4 py-3 rounded-lg font-semibold text-xl transition duration-300 shadow-md hover:shadow-lg w-full sm:w-auto">
                    Make Payment
                  </button>
                </NavLink>
                <NavLink to="/order">
                  <button className="bg-[#FFA726] hover:bg-[#FB8C00] text-white px-4 py-3 rounded-lg font-semibold text-xl transition duration-300 shadow-md hover:shadow-lg w-full sm:w-auto">
                    Back to Orders
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col justify-center items-center">
          <h1 className="text-gray-700 font-semibold text-2xl mb-4">
            Your cart is empty!
          </h1>
          <NavLink to="/">
            <button className="bg-[#FFA726] hover:bg-[#FB8C00] text-white py-3 px-10 rounded-lg font-semibold text-lg tracking-wider transition duration-300 shadow-md hover:shadow-lg">
              Order Again
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Cart;
