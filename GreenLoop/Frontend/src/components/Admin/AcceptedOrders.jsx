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

function AcceptedOrders() {
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAcceptedOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${URL}/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status >= 200 && response.status < 300) {
          const filteredOrders = response.data.data.filter(order => order.status === 'accepted');
          setAcceptedOrders(filteredOrders);
        } else {
          alert('Unexpected response status: ' + response.status);
        }
        
        setLoading(false);
      } catch (error) {
        alert('Error fetching accepted orders: ' + error.message);
        setLoading(false);
      }
    };

    fetchAcceptedOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${URL}/order/status/${orderId}`, 
        { status }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

      if (response.status >= 200 && response.status < 300) {
        alert('Order status updated successfully');
        
        if (status === 'rejected') {
          setAcceptedOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        }
      } else {
        alert('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      alert(`Error updating order status to ${status}: ` + error.message);
    }
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Accepted Orders</Text>
      {acceptedOrders.length === 0 ? (
        <Text>No accepted orders</Text>
      ) : (
        acceptedOrders.map(order => (
          <Box key={order._id} mb={8}>
            <Text fontSize="xl" fontWeight="bold">Order ID: {order._id}<br/>
            Customer : {order.userId.name}</Text>
            <Box overflowX="auto"> {/* Enable horizontal scrolling */}
              <Table variant="striped" mt={4}>
                <Thead>
                  <Tr>
                    <Th>Product ID</Th>
                    <Th>Article</Th>
                    <Th>Brand</Th>
                    <Th>Price</Th>
                    <Th>Color</Th>
                    <Th>Item Set</Th>
                    <Th>Quantity</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {order.items.map(item => (
                    <Tr key={item.productId._id}>
                      <Td>{item.productId._id}</Td>
                      <Td>{item.productId.article || 'N/A'}</Td>
                      <Td>{item.productId.brand || 'N/A'}</Td>
                      <Td>₹{item.price}</Td>
                      <Td>{item.color}</Td>
                      <Td>{item.itemSet && item.itemSet.length > 0
                        ? item.itemSet.map(i => `${i.size} (Pcs: ${i.lengths})`).join(', ')
                        : "N/A"}</Td>
                      <Td>{item.quantity}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <Box mt={4}>
              <Button colorScheme="red" onClick={() => updateOrderStatus(order._id, 'rejected')}>Reject Order</Button>
            </Box>
            <Divider my={4} />
          </Box>
        ))
      )}
    </Box>
  );
}

export default AcceptedOrders;