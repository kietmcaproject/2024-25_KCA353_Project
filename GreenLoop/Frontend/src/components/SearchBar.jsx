import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Input, Grid, GridItem, Heading, Text, Image, Spinner, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// Search Input Component
const SearchInput = React.memo(({ searchTerm, onSearchChange }) => (
    <Box
        mb={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        <Input
            type="text"
            placeholder="Search Product"
            value={searchTerm}
            onChange={onSearchChange}
            size="lg"
            width={{ base: '90%', sm: '70%', md: '50%' }}
            borderColor="red.500"
            focusBorderColor="red.600"
            _placeholder={{ color: 'gray.500' }}
            p={4}
            boxShadow="md"
        />
    </Box>
));

// Search Results Component
const SearchResults = React.memo(({ filteredResults, loading, error }) => {
    if (loading) return <Spinner size="lg" color="red.500" />; 
    if (error) return <Heading as="h3" color="red.500">Error fetching data</Heading>;

    return (
        <Grid
            templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={6}
            p={4}
            mb={8}
        >
            {filteredResults.length > 0 ? (
                filteredResults.map((product) => (
                    <GridItem
                        key={product._id}
                        bg="white"
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="lg"
                        _hover={{ boxShadow: 'xl', transform: 'scale(1.03)', transition: 'all 0.3s ease' }}
                        cursor="pointer"
                    >
                        <Link to={`/product/${product._id}`}>
                            <Box position="relative">
                                <Image
                                    src={product.images[0]}
                                    alt={`${product.brand} ${product.article}`}
                                    boxSize="100%"
                                    objectFit="cover"
                                    height="220px"
                                />
                                <Box
                                    position="absolute"
                                    top="10px"
                                    left="10px"
                                    background="rgba(255, 255, 255, 0.7)"
                                    p={2}
                                    borderRadius="full"
                                    fontSize="sm"
                                    fontWeight="bold"
                                    color="red.500"
                                >
                                    {product.brand}
                                </Box>
                            </Box>

                            <Box p={4}>
                                <Heading size="md" noOfLines={1} color="red.600">
                                    {product.article}
                                </Heading>
                                <Text color="gray.700" fontSize="md" noOfLines={1}>
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
                ))
            ) : (
                <Text fontSize="lg" color="gray.500" textAlign="center">No results found</Text>
            )}
        </Grid>
    );
});

// Main SearchBar Component
const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 600);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            searchProducts(debouncedSearchTerm);
        } else {
            setFilteredResults([]);
        }
    }, [debouncedSearchTerm]);

    const searchProducts = async (term) => {
        setLoading(true);
        setError(false);

        try {
            const response = await axios.get(`https://greenloop-nw0w.onrender.com/v1/search?q=${term}`);
            setFilteredResults(response.data.products);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <Box bg="red.50" p={4} mt={8}>
            <SearchInput searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <SearchResults filteredResults={filteredResults} loading={loading} error={error} />
        </Box>
    );
};

export default SearchBar;


//search