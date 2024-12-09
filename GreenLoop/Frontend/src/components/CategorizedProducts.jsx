import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, Image, Text, VStack, Button, useBreakpointValue, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CategorizedProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://greenloop-nw0w.onrender.com/api/v1/search/category/specific/?${category}`);
        setProducts(response.data.products); // Assuming response.data.products contains the products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
        setLoading(false);
        toast({
          title: 'Error',
          description: 'Failed to load products. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchProducts();
  }, [category, toast]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <Box p={4}>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {products.map((product) => (
          <Box
            key={product._id}
            bg="white"
            boxShadow="lg"
            borderRadius="md"
            overflow="hidden"
            _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
            transition="all 0.3s ease"
            p={4}
          >
            <Link to={`/product/${product._id}`}>
              <Box>
                <Image
                  src={product.images[0]}
                  alt={product.article}
                  boxSize="200px"
                  objectFit="cover"
                  borderRadius="md"
                  mb={4}
                />
                <VStack align="start" spacing={2}>
                  <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                    {product.article}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {product.brand}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    MRP: ₹{product.price}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    Colors: {product.colors && Object.keys(product.colors).length > 0 ? Object.keys(product.colors).join(', ') : 'N/A'}
                  </Text>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    variant="outline"
                    size="sm"
                    w="full"
                    _hover={{ bg: 'teal.100', borderColor: 'teal.500' }}
                  >
                    View Details
                  </Button>
                </VStack>
              </Box>
            </Link>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default CategorizedProducts;
