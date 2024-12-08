import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css'; // Reuse Cart CSS for consistent styling

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get(
          'https://greenloop-nw0w.onrender.com/api/v1/order/history',
          { headers }
        );
        setOrders(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleCancelOrder = async (orderId) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      await axios.post(
        `https://greenloop-nw0w.onrender.com/api/v1/order/cancel/${orderId}`,
        {},
        { headers }
      );

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
      alert('Order canceled successfully');
    } catch (err) {
      console.error('Error canceling order:', err);
      alert('Failed to cancel the order');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || orders.length === 0) {
    return <div>Error: No recent orders found</div>;
  }

  return (
    <div className="cart">
      <h2>Your Past Orders</h2>
      {orders.length === 0 ? (
        <p>No past orders available</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="cart-item">
              <div className="cart-item-details">
                <div>
                  <h3>Order ID: {order._id}</h3>
                  <p>Status: {order.status}</p>
                  <p>Total Price: ₹{order.totalPrice}</p>
                  <p>Total Items: {order.totalItems}</p>
                  <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="rest-details">
                <div className="order-items">
                  <h4>Items:</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="">
                      <div>
                        <img
                          src={item.productId.images[0]}
                          alt={item.productId.name}
                          className="order-item-image"
                          style={{ verticalAlign: 'middle' }}
                        />
                      </div>
                      <div className="order-item-details">
                        <p>Product: {item.productId.name}</p>
                        <p>Brand: {item.productId.brand}</p>
                        <p>Color: {item.color}</p>
                        <p>Price: ₹{item.productId.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cancel Order Section */}
                {order.status === 'pending' ? (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="remove-button"
                  >
                    Cancel Order
                  </button>
                ) : (
                  <p className="non-cancellable">Can't cancel, order already accepted</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
