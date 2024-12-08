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
  useBreakpointValue,
} from '@chakra-ui/react';

const URL = "https://saleem-footwear-api.vercel.app/api/v1";

function PendingOrders() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${URL}/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status >= 200 && response.status < 300) {
          const filteredOrders = response.data.data.filter(order => order.status === 'pending');
          setPendingOrders(filteredOrders);
        } else {
          console.error('Unexpected response status:', response.status);
        }
        console.log(response)

        setLoading(false);
      } catch (error) {
        console.error('Error fetching pending orders', error);
        setLoading(false);
      }
    };

    fetchPendingOrders();
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
        setPendingOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      } else {
        alert('Unexpected response status:', response.status);
      }
    } catch (error) {
      alert(`Error updating order status to ${status}`, error);
    }
  };

  const updateItemStatus = async (orderId, itemId, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${URL}/order/item/${orderId}/status`, 
        {
          itemId,
          status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

      if (response.status >= 200 && response.status < 300) {
        const updatedOrders = pendingOrders.map(order => {
          if (order._id === orderId) {
            return {
              ...order,
              items: order.items.filter(item => item._id !== itemId)
            };
          }
          return order;
        });
        setPendingOrders(updatedOrders);
        alert('Item status updated successfully');
      } else {
        alert('Unexpected response status:', response.status);
      }
    } catch (error) {
      alert(`Error updating item status for ${itemId} to ${status}`, error);
    }
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Pending Orders</Text>
      {pendingOrders.length === 0 ? (
        <Text>No pending orders</Text>
      ) : (
        pendingOrders.map(order => (
          <Box key={order._id} mb={8}>
            <Text fontSize="xl" fontWeight="bold">Order ID: {order._id}<br/>
              Customer : {order.userId.name}
            </Text>
            <Box overflowX="auto"> {/* Enable horizontal scrolling */}
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
                      <Td>{item.productId ? item.productId._id : "N/A"}</Td>
                      <Td>{item.productId?.article || "N/A"}</Td>
                      <Td>{item.productId?.brand || "N/A"}</Td>
                      <Td>₹{item.price}</Td>
                      <Td>{item.color}</Td>
                      <Td>{item.itemSet && item.itemSet.length > 0
                        ? item.itemSet.map(i => `${i.size} (Pcs: ${i.lengths})`).join(', ')
                        : "N/A"}</Td>
                      <Td>{item.quantity}</Td>
                      <Td>
                        <Button colorScheme="green" size="sm" onClick={() => updateItemStatus(order._id, item._id, 'accepted')}>Accept</Button>
                        <Button colorScheme="red" size="sm" ml={2} onClick={() => updateItemStatus(order._id, item._id, 'rejected')}>Reject</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <Box mt={4}>
              <Button colorScheme="green" onClick={() => updateOrderStatus(order._id, 'accepted')}>Accept All</Button>
              <Button colorScheme="red" ml={2} onClick={() => updateOrderStatus(order._id, 'rejected')}>Reject All</Button>
            </Box>
            <Divider my={4} />
          </Box>
        ))
      )}
    </Box>
  );
}

export default PendingOrders;