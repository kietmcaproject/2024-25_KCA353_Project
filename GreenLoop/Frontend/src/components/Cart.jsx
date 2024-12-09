import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Text,
  Image,
  HStack,
  VStack,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Stack,
} from '@chakra-ui/react';

const URL = "https://greenloop-nw0w.onrender.com/api/v1";
const token = localStorage.getItem('token');

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantityChanges, setQuantityChanges] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };
        const response = await axios.get(`${URL}/cart`, { headers });
        const cartData = response.data.data.items || [];

        const calculatedTotalPrice = cartData.reduce((acc, item) => {
          const fullQuantity = item.itemSet.reduce((sum, setItem) => sum + setItem.lengths, 0);
          return acc + fullQuantity * item.productId.price;
        }, 0);

        setUserId(response.data.data.userId);
        setTotalItems(response.data.data.totalItems);
        setTotalPrice(calculatedTotalPrice);
        setCart(cartData);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setCart([]);
      }
    };

    fetchCart();
  }, []);

  const removeItem = async (CartItemId) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(`${URL}/cart/${CartItemId}`, { headers });
      setCart(cart.filter((item) => item._id !== CartItemId));
      toast({
        title: "Item removed",
        description: "The item has been removed from the cart.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleQuantityChange = (CartItemId, increment) => {
    const cartItem = cart.find((item) => item._id === CartItemId);
    const itemSetLength = cartItem.itemSet.reduce((sum, setItem) => sum + setItem.lengths, 0);

    const newQuantity = (quantityChanges[CartItemId] ?? itemSetLength) + increment * itemSetLength;

    if (newQuantity < itemSetLength) return;

    setQuantityChanges((prev) => ({
      ...prev,
      [CartItemId]: newQuantity,
    }));
  };

  const handlePdfDownload = () => {
    if (cart.length > 0) {
      const input = document.querySelector('.cart');
      const originalColor = input.style.color;
      input.style.color = 'black';

      html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('Cart.pdf');
        input.style.color = originalColor;
      });
    }
  };

  const handleOrderNow = () => {
    onOpen();
  };

  const confirmOrder = async () => {
    onClose();
    try {
      if (cart.length > 0) {
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const orderData = {
          userId: userId,
          items: cart.map((item) => ({
            productId: item.productId._id,
            quantity: item.itemSet.reduce((sum, setItem) => sum + setItem.lengths, 0),
            price: item.productId.price,
          })),
          totalPrice: totalPrice,
          totalItems: totalItems,
        };

        const response = await axios.post(`${URL}/order`, orderData, { headers });

        toast({
          title: "Order placed",
          description: `Your order of ₹${totalPrice} has been placed successfully.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        setCart([]);
        navigate('/order-summary', { state: { order: response.data.data } });
      } else {
        toast({
          title: "Cart is empty",
          description: "Please add items to your cart before placing an order.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <Box p={4} bg="gray.100" minH="100vh">
      <Text fontSize="3xl" fontWeight="bold" color="red.500">
        Cart
      </Text>
      <Text fontSize="lg" color="gray.700" mb={4}>
        Total Cost: ₹{totalPrice}
      </Text>
      {cart.length === 0 ? (
        <Text color="gray.500">Your cart is empty</Text>
      ) : (
        <Stack spacing={4}>
          {cart.map((item, index) => (
            <Box
              key={index}
              p={4}
              borderWidth={1}
              borderRadius="lg"
              bg="white"
              shadow="sm"
            >
              <HStack spacing={4}>
                <Image
                  src={item.productId.images[0]}
                  alt={item.productId.name}
                  boxSize="80px"
                  borderRadius="md"
                />
                <VStack align="start" spacing={1} flex="1">
                  <Text fontWeight="bold" fontSize="lg">
                    {item.productId.name}
                  </Text>
                  <Text>Brand: {item.productId.brand}</Text>
                  <Text>Price: ₹{item.productId.price}</Text>
                </VStack>
              </HStack>
              <HStack spacing={4} mt={2}>
                <Button size="sm" onClick={() => handleQuantityChange(item._id, -1)}>
                  -
                </Button>
                <Text>{quantityChanges[item._id] ?? item.itemSet.length}</Text>
                <Button size="sm" onClick={() => handleQuantityChange(item._id, 1)}>
                  +
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </Button>
              </HStack>
            </Box>
          ))}
        </Stack>
      )}
      <Divider my={4} />
      <HStack justifyContent="space-between">
        <Button colorScheme="red" onClick={handleOrderNow}>
          Order Now
        </Button>
        <Button onClick={handlePdfDownload}>Download PDF</Button>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Order</ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to place the order worth ₹{totalPrice}?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={confirmOrder} ml={3}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Cart;
