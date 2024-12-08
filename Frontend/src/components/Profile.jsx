import React, { useEffect, useState } from 'react';
import { Box, Input, Spinner, Text, Heading, Flex } from '@chakra-ui/react';
import './Profile.css'; // Optional: Create a CSS file for styling

const Profile = () => {
  const [user, setUser] = useState(null); // Initial state as null
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUser, setFilteredUser] = useState(null);

  useEffect(() => {
    const fetchProfileFromLocalStorage = () => {
      try {
        const token = localStorage.getItem('token'); // Adjust key if necessary
        if (token) {
          // Parse the token if needed (assuming it's a JWT)
          const userInfo = JSON.parse(atob(token.split('.')[1])); // For JWT, parsing payload
          setUser(userInfo);
          setFilteredUser(userInfo); // Initial filtered user data is the full profile
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching profile from local storage:', error);
      }
    };

    fetchProfileFromLocalStorage();
  }, []);

  useEffect(() => {
    if (searchTerm && user) {
      const filteredData = Object.entries(user)
        .filter(([key, value]) =>
          key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});
      setFilteredUser(filteredData);
    } else {
      setFilteredUser(user); // If no search term, show full profile
    }
  }, [searchTerm, user]);

  // Check if user is null or filteredUser is null before rendering
  if (!user) return <Flex justify="center" align="center" minHeight="100vh"><Spinner size="lg" color="red.500" /></Flex>;

  return (
    <Box p={4} bg="gray.50" minHeight="100vh">
      <Heading as="h1" mb={6} color="red.600" textAlign="center">Profile</Heading>

      <Input
        type="text"
        placeholder="Search profile information..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="lg"
        mb={4}
        borderColor="red.500"
        focusBorderColor="red.600"
        _placeholder={{ color: 'gray.500' }}
        p={4}
        boxShadow="md"
        width={{ base: '90%', sm: '70%', md: '50%' }}
        marginX="auto"
      />

      <Box className="profile-details" bg="white" p={6} borderRadius="lg" boxShadow="md">
        {filteredUser && Object.keys(filteredUser).length > 0 ? (
          Object.entries(filteredUser).map(([key, value]) => (
            <Text key={key} fontSize="lg" mb={2}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </Text>
          ))
        ) : (
          <Text fontSize="lg" color="gray.500">No matching profile information found.</Text>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
