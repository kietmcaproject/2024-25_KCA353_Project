import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Image, Grid, Heading, Text, VStack, useToast, Center } from "@chakra-ui/react";
import ABHISHEK from "./images/abhishek.jpg";
import ANUP from "./images/anup.jpg";
import ABHIJEET from "./images/abhijeet.jpg";
import ANKIT from "./images/ankit.jpg";
import KUMAR_KASHYAP from "./images/Kashyap.jpg"; 
import DIVYAM from "./images/divyam.jpg"; 

const brands = [
  { id: 1, name: "Abhishek", image: ABHISHEK, role: "Full Stack Developer" },
  { id: 3, name: "Ankit", image: ANKIT, role: "Full Stack Developer" },
  { id: 4, name: "Anup", image: ANUP, role: "Full Stack Developer" },
  { id: 5, name: "Abhijeet", image: ABHIJEET, role: "Full Stack Developer" },
];

const contributors = [
  { id: 1, name: "Kumar Kashyap", image: KUMAR_KASHYAP, role: "Contributor" },
  { id: 2, name: "Divyam", image: DIVYAM, role: "Contributor" },
];

const URL = "https://greenloop-nw0w.onrender.com/api/v1/search/brand";

const BrandScroller = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(URL, {
          maxBodyLength: Infinity,
        });
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast({
          title: "Error",
          description: "Failed to fetch categories.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category-grid/brand=${category}`);
  };

  return (
    <Box bg="gray.50" p={6} rounded="md" boxShadow="sm">
      {/* WHO WE ARE Section */}
      <Heading as="h3" size="lg" textAlign="center" mb={6} color="teal.600">
        WHO WE ARE
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
        {brands.map((brand) => (
          <Box
            key={brand.id}
            bg="white"
            p={4}
            rounded="lg"
            boxShadow="md"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
            onClick={() => handleCategoryClick(brand.name.toUpperCase())}
          >
            <VStack>
              <Image
                src={brand.image}
                alt={brand.name}
                boxSize="120px"
                borderRadius="full"
                objectFit="cover"
                mb={4}
              />
              <Text fontWeight="bold" fontSize="lg" color="teal.800">
                {brand.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {brand.role}
              </Text>
            </VStack>
          </Box>
        ))}
      </Grid>

      {/* Special Thanks Section */}
      <Center mt={12}>
        <Heading as="h4" size="md" mb={6} color="teal.600">
          Special Thanks to Our Contributors
        </Heading>
      </Center>
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
        {contributors.map((contributor) => (
          <Box
            key={contributor.id}
            bg="white"
            p={4}
            rounded="lg"
            boxShadow="md"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
          >
            <VStack>
              <Image
                src={contributor.image}
                alt={contributor.name}
                boxSize="120px"
                borderRadius="full"
                objectFit="cover"
                mb={4}
              />
              <Text fontWeight="bold" fontSize="lg" color="teal.800">
                {contributor.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {contributor.role}
              </Text>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default BrandScroller;
