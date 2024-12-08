import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
  Text,
  Divider,
} from '@chakra-ui/react';

const URL = "https://saleem-footwear-api.vercel.app/api/v1";

function RejectedOrders() {
  const [rejectedOrders, setRejectedOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRejectedOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${URL}/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status >= 200 && response.status < 300) {
          const filteredOrders = response.data.data.filter(order => order.status === 'rejected');
          setRejectedOrders(filteredOrders);
        } else {
          alert('Unexpected response status: ' + response.status);
        }
        
        setLoading(false);
      } catch (error) {
        alert('Error fetching rejected orders: ' + error.message);
        setLoading(false);
      }
    };

    fetchRejectedOrders();
  }, []);

  const handleReinstateOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${URL}/order/status/${orderId}`, 
      { status: 'pending' }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status >= 200 && response.status < 300) {
        alert('Order status updated to pending');
        setRejectedOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      } else {
        alert('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      alert('Error updating order status to pending: ' + error.message);
    }
  };

  const handleReinstateItem = async (orderId, itemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${URL}/order/item/${orderId}/status`, 
        {
          itemId,
          status: 'pending'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

      if (response.status >= 200 && response.status < 300) {
        const updatedOrders = rejectedOrders.map(order => {
          if (order._id === orderId) {
            return {
              ...order,
              items: order.items.filter(item => item._id !== itemId)
            };
          }
          return order;
        });
        setRejectedOrders(updatedOrders);
        alert('Item reinstated successfully');
      } else {
        alert('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      alert(`Error reinstating item: ${error.message}`);
    }
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Rejected Orders</Text>
      {rejectedOrders.length === 0 ? (
        <Text>No rejected orders</Text>
      ) : (
        rejectedOrders.map(order => (
          <Box key={order._id} mb={8}>
            <Text fontSize="xl" fontWeight="bold">Order ID: {order._id}<br/>
            Customer : {order.userId.name}</Text>
            <Box overflowX="auto">
              <Table variant="simple" mt={4}>
                <Thead>
                  <Tr>
                    <Th>Product ID</Th>
                    <Th>Article</Th>
                    <Th>Brand</Th>
                    <Th>Price</Th>
                    <Th>Color</Th>
                    <Th>Item Set</Th>
                    <Th>Quantity</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {order.items.map(item => (
                    <Tr key={item._id}>
                      <Td>{item.productId._id}</Td>
                      <Td>{item.productId.article}</Td>
                      <Td>{item.productId.brand}</Td>
                      <Td>₹{item.price}</Td>
                      <Td>{item.color}</Td>
                      <Td>{item.itemSet && item.itemSet.length > 0
                        ? item.itemSet.map(i => `${i.size} (Pcs: ${i.lengths})`).join(', ')
                        : "N/A"}</Td>
                      <Td>{item.quantity}</Td>
                      <Td>
                        <Button 
                          colorScheme="blue" 
                          size="sm"
                          onClick={() => handleReinstateItem(order._id, item._id)}
                        >
                          Reinstate Item
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            
            {/* Customer Info */}
            <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
              <Text fontSize="lg" fontWeight="bold">Customer Information</Text>
              <Text>User ID: {order.userId?._id || 'N/A'}</Text>
              <Text>Name: {order.userId?.name || 'N/A'}</Text>
              <Text>Address: {order.userId?.address || 'N/A'}</Text>
            </Box>

            {/* Order Actions */}
            <Box mt={4}>
              <Button 
                colorScheme="blue" 
                onClick={() => handleReinstateOrder(order._id)}
              >
                Reinstate Entire Order
              </Button>
            </Box>
            <Divider my={4} />
          </Box>
        ))
      )}
    </Box>
  );
}

export default RejectedOrders;