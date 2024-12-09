import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllCustomers.css';

function AllCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch all customers from backend
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await axios.get('https://greenloop-nw0w.onrender.com/api/v1/users', {
          headers: { Authorization: `Bearer ${token}` } // Add token to the request headers
        });
        console.log(response)
        setCustomers(response.data.users);
      } catch (error) {
        console.error('Error fetching customers', error);
      }
    };

    fetchCustomers();
  }, []);

  // const handleViewDetails = (customerId) => {
  //   // Logic to view customer details
  //   console.log(`View details for customer ${customerId}`);
  //   // You can navigate to a details page or open a modal with customer details
  // };

  // const handleEditCustomer = (customerId) => {
  //   // Logic to edit customer details
  //   console.log(`Edit customer ${customerId}`);
  //   // You can navigate to an edit page or open a form for editing
  // };

  const handleDeleteCustomer = async (customerId) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      await axios.delete(`https://saleem-footwear-api.vercel.app/api/v1/customers/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` } // Add token to the request headers
      });
      // Remove the deleted customer from the list
      setCustomers(prevCustomers => prevCustomers.filter(cust => cust.id !== customerId));
    } catch (error) {
      console.error('Error deleting customer', error);
    }
  };

  return (
    <div className="all-customers">
      <h2>All Customers</h2>
      {customers.length === 0 ? (
        <p>No customers found</p>
      ) : (
        <div>
          {customers.map(customer => (
            <div key={customer.id} className="customer-item">
              <p>Name: {customer.name}</p>
              <p>Email: {customer.email}</p>
              <p>Address: {customer.address}</p>
              <p>Phone: {customer.phone}</p>
              {/* <button onClick={() => handleViewDetails(customer.id)}>View Details</button>
              <button onClick={() => handleEditCustomer(customer.id)}>Edit</button> */}
              <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllCustomers;
