import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Text, HStack, VStack } from '@chakra-ui/react';
import { SearchIcon, PhoneIcon, ArrowBackIcon } from '@chakra-ui/icons';
import axios from 'axios';

const URL = "https://greenloop-nw0w.onrender.com/api/v1";
const token = localStorage.getItem('token');

const Header = () => {
  const [cartlength, setCartlength] = useState(0);
  const navigate = useNavigate();  // useNavigate hook for navigation

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get(`${URL}/cart`, { headers });
        setCartlength((response.data.data.items).length || 0);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setCartlength(0);
      }
    };

    fetchCart();
    window.addEventListener('cart-updated', fetchCart);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('cart-updated', fetchCart);
  }, [token]);

  // Handle back button click to navigate to the previous page
  const handleBack = () => {
    navigate(-1);  // This will go back to the previous page
  };

  return (
    <Box 
      bg="black" 
      color="white" 
      p={4} 
      position="fixed" 
      top={0} 
      left={0} 
      right={0} 
      zIndex={1000}
    >
      <HStack spacing={4} justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Back Button */}
        <IconButton
          aria-label="Back"
          icon={<ArrowBackIcon />}
          variant="ghost"
          colorScheme="whiteAlpha"
          fontSize="xl"
          onClick={handleBack}
        />

        {/* Contact Us Button */}
        <Link to='/contact-us'>
          <Button
            leftIcon={<PhoneIcon />}
            variant="ghost"
            colorScheme="whiteAlpha"
            fontSize="sm"
          >
            CONTACT US
          </Button>
        </Link>

        {/* Search Icon */}
        <Link to='/search'>
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            variant="ghost"
            colorScheme="whiteAlpha"
            fontSize="xl"
          />
        </Link>

        {/* Cart Button with Custom SVG Icon */}
        <Link to='/cart'>
          <Button
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20" height="20">
                <path fill="red" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
            }
            variant="ghost"
            colorScheme="whiteAlpha"
            fontSize="sm"
            display="flex"
            alignItems="center"
          >
            <Text ml={2} fontSize="lg" fontWeight="bold">{cartlength}</Text>
          </Button>
        </Link>
      </HStack>

      
    </Box>
  );
};

export default Header;
