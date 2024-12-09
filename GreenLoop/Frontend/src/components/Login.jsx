import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
  ChakraProvider,
} from '@chakra-ui/react';

const URL = "https://greenloop-nw0w.onrender.com/api/v1";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const toast = useToast(); // Toast for notifications

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const login_body = {
      identifier: email,
      password: password,
    };

    loginUser(login_body);
  };

  const loginUser = async (body) => {
    try {
      const response = await axios.post(`${URL}/auth/login`, body);
      console.log("Login Successful:", response.data);
      let token = response.data.token;
      let role = response.data.userToken.role;

      localStorage.setItem("token", token);
      localStorage.setItem('role', role);

      toast({
        title: "Login Successful",
        description: "You have been successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate('/'); // Navigate to the home page
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.msg || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Flex
        minHeight="100vh"
        align="center"
        justify="center"
        bgGradient="linear(to-br, red.500, red.300, white)"
        p={4}
      >
        <Box
          maxWidth="400px"
          width="full"
          p={8}
          bg="white"
          borderRadius="md"
          boxShadow="2xl"
        >
          <Heading as="h2" size="lg" textAlign="center" mb={6} color="red.600">
            Welcome Back
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4} isRequired>
              <FormLabel color="red.600">Phone</FormLabel>
              <Input
                type="tel"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your phone number"
                bg="gray.50"
                focusBorderColor="red.400"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel color="red.600">Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                bg="gray.50"
                focusBorderColor="red.400"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="red"
              width="full"
              mt={4}
              _hover={{ bg: "red.500" }}
            >
              Log In
            </Button>
          </form>
          <Flex justify="center" mt={4} align='center'>
            <Text fontSize="sm" color="gray.600" mr={2}>
              Don&apos;t have an account?
            </Text>
            <Button
              variant="outline"
              colorScheme="red"
              fontWeight="bold"
              
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default Login;
