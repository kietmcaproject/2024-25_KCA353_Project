import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Heading, Input, Select, VStack, ChakraProvider, extendTheme, Flex } from '@chakra-ui/react';

// Define API URL
const URL = "https://greenloop-nw0w.onrender.com/api/v1";

// Custom theme with red background
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'red.100', // Light red background
        color: 'gray.800', // Darker text for better readability
      },
    },
  },
});

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const body = {
      name,
      shopName: email,
      password,
      address,
      phone,
      role,
    };

    try {
      const response = await axios.post(`${URL}/auth/register`, body);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.msg || 'Error registering user');
      console.error(error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex justify="center" align="center" minH="100vh" py={8} px={4}>
        <Box
          w="full"
          maxW="500px"
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="lg"
        >
          <Heading textAlign="center" color="red.500" mb={6}>
            Register
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  focusBorderColor="red.500"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Shop Name</FormLabel>
                <Input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  focusBorderColor="red.500"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  focusBorderColor="red.500"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  focusBorderColor="red.500"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  focusBorderColor="red.500"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  focusBorderColor="red.500"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  focusBorderColor="red.500"
                >
                  <option value="customer">Customer</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </Select>
              </FormControl>
              <Button
                type="submit"
                colorScheme="red"
                w="full"
              >
                Register
              </Button>
              <Button
                variant="outline"
                colorScheme="red"
                w="full"
                onClick={() => navigate('/login')}
              >
                Log-in
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default Register;
