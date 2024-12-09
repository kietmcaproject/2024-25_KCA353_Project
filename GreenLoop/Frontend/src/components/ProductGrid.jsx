import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Grid, GridItem, Heading, Text, Image, Button, Flex, Spinner, useBreakpointValue } from '@chakra-ui/react';

// Define API URL
const URL = "https://greenloop-nw0w.onrender.com/api/v1";
const token = localStorage.getItem('token');

// Custom hook to fetch data
const useFetchData = (url, limit = 20) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);

  const fetchData = async (page) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(url, {
        params: { page, limit },
      });

      if (response.data.products.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => [...prevData, ...response.data.products]);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pageRef.current);
  }, [url]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition >= scrollableHeight - 100 && hasMore && !loading) {
        pageRef.current += 1;
        fetchData(pageRef.current);
      }
    };

    if (hasMore) {
      window.addEventListener('scroll', handleScroll);
    }

    // Clean up the event listener on unmount or if there's no more data
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, loading]);

  return { data, loading, error, hasMore };
};

const ProductGrid = () => {
  const { data: products, loading, error } = useFetchData(`${URL}/products`);

  if (error) {
    return <Heading as="h2" color="red.500">Something went wrong</Heading>;
  }

  return (
    <Box
      bg="red.50"
      p={4}
      minHeight="100vh"
    >
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={4}
        p={2}
      >
        {products.map((product) => (
          <GridItem key={product._id} borderRadius="md" overflow="hidden" bg="white" boxShadow="md">
            <Link to={`/product/${product._id}`}>
              <Box position="relative">
                <Image
                  src={product.images[0]}
                  alt={`${product.brand} ${product.article}`}
                  boxSize="100%"
                  objectFit="cover"
                  height="200px"
                />
                <Box
                  position="absolute"
                  top="0"
                  right="0"
                  background="rgba(255, 255, 255, 0.7)"
                  p={2}
                  borderRadius="full"
                >
                  <Text fontSize="sm" color="red.500" fontWeight="bold">
                    {product.brand}
                  </Text>
                </Box>
              </Box>

              <Box p={4}>
                <Heading size="md" noOfLines={1} color="red.600">
                  {product.article}
                </Heading>
                <Text color="gray.600" fontSize="sm" noOfLines={1}>
                  MRP: ₹{product.price}
                </Text>

                <Text
                  mt={2}
                  fontSize="sm"
                  color="gray.500"
                  noOfLines={2}
                  fontWeight="bold"
                >
                  Colors: {product.colors && Object.keys(product.colors).length > 0
                    ? Object.keys(product.colors).join(', ')
                    : "N/A"}
                </Text>
              </Box>
            </Link>
          </GridItem>
        ))}
      </Grid>

      {loading && (
        <Flex justify="center" mt={6}>
          <Spinner size="lg" color="red.500" />
        </Flex>
      )}
    </Box>
  );
};

export default ProductGrid;
