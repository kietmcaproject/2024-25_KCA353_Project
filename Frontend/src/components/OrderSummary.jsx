import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Image,
  useToast,
  useBreakpointValue,
  Stack,
} from '@chakra-ui/react';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { order } = location.state || {}; // Access the passed order data

  if (!order) {
    return <Text>No order details found. Please go back and try again.</Text>;
  }

  const handleCancelOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `https://greenloop-nw0w.onrender.com/api/v1/orders/${order._id}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast({
          title: 'Order Canceled.',
          description: 'Your order has been canceled successfully.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        navigate('/orders'); // Redirect to the orders page or another appropriate page
      } else {
        toast({
          title: 'Failed to cancel order.',
          description: 'There was an issue canceling your order.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error canceling order:', error);
      toast({
        title: 'Error.',
        description: 'An error occurred while canceling the order.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" color="red.500" mb={4}>
        Order Summary
      </Heading>

      <Text fontSize="xl" mb={4}>
        Order ID: <strong>{order._id}</strong>
      </Text>
      <Text fontSize="xl" mb={4}>
        Date: <strong>{new Date(order.createdAt).toLocaleDateString()}</strong>
      </Text>

      <VStack align="start" spacing={6} divider={<Divider />} mb={6}>
        {order.items.map((item, index) => (
          <Box
            key={index}
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            width="100%"
            bg="gray.50"
          >
            <HStack spacing={4}>
              {/* <Image
                src={item.productId.images[0]}
                alt={item.productId.name}
                boxSize="120px"
                objectFit="cover"
                borderRadius="md"
              /> */}
              <VStack align="start" spacing={2} width="full">
                <Text fontSize="lg" fontWeight="bold">
                  {item.productId.name}
                </Text>
                <Text>Brand: {item.productId.brand}</Text>
                <Text color="red.500">
                  Price per Unit: ₹{item.productId.price}
                </Text>
                <Text>
                  Item Set:{' '}
                  {item.itemSet &&
                    item.itemSet.length > 0 &&
                    item.itemSet
                      .map((setItem) => `${setItem.size} (Pcs: ${setItem.lengths})`)
                      .join(', ')}
                </Text>
                <Text>
                  Quantity: <strong>{item.quantity}</strong>
                </Text>
                <Text color="red.500" fontWeight="bold">
                  Total Price: ₹{item.price * item.quantity}
                </Text>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>

      <Box mt={6} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
        
        <Text fontSize="lg" mb={4}>
          Total Items: {order.totalItems}
        </Text>

        <HStack spacing={4}>
          <Button onClick={() => window.print()} colorScheme="blue" width="full">
            Print Summary
          </Button>
          <Button
            onClick={handleCancelOrder}
            colorScheme="red"
            width="full"
            variant="outline"
          >
            Cancel Order
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default OrderSummary;
