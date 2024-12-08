import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Select,
  Text,
  Badge,
  Spinner,
  Input,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';

const addToCart = async (product, selectedColor, selectedSize, quantity) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const selectedItemSet = product.itemSet.find((item) => item.size === selectedSize);

  const body = {
    productId: product.id,
    quantity: quantity,
    itemSet: selectedItemSet ? [selectedItemSet] : [], // Only include the selected size
    color: selectedColor,
    size: selectedSize,
  };

  try {
    const response = await axios.post('https://greenloop-nw0w.onrender.com/api/v1/cart/add-to-cart', body, { headers });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

const ProductCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Chakra UI AlertDialog state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dialogMessage, setDialogMessage] = useState('');
  const cancelRef = React.useRef();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://greenloop-nw0w.onrender.com/api/v1/products/${id}`);
        setProduct(response.data.product);

        if (response.data.product.colors && Object.keys(response.data.product.colors).length > 0) {
          setSelectedColor(Object.keys(response.data.product.colors)[0]);
        }

        if (response.data.product.itemSet) {
          setSizes(response.data.product.itemSet);
          if (response.data.product.itemSet.length > 0) {
            setSelectedSize(response.data.product.itemSet[0].size); // Set default size
          }
        }

        console.log(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <Spinner size="xl" />; // Show loading spinner while fetching

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleQuantityChange = (action) => {
    setQuantity((prevQuantity) => {
      if (action === 'increment') {
        return prevQuantity + 1;
      } else if (action === 'decrement' && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const token = localStorage.getItem('token');
  const handleAddToCart = () => {
    if (token) {
      if (selectedColor && selectedSize && quantity > 0) {
        addToCart(product, selectedColor, selectedSize, quantity);
        setDialogMessage('Item Added to Cart Successfully');
        onOpen();
        window.dispatchEvent(new Event('cart-updated'));
      } else {
        setDialogMessage('Please select a color, size, and a valid quantity.');
        onOpen();
      }
    } else {
      setDialogMessage('You are not logged in. To add a product to the cart, you must be logged in.');
      onOpen();
    }
  };

  const handleNavigateLogin = () => {
    onClose();
    navigate('/login');
  };

  const imagesToShow = selectedColor ? product.colors[selectedColor] : product.images;

  return (
    <Flex direction={{ base: 'column', md: 'row' }} p={2} gap={8} alignItems="center">
      {/* Product Image Gallery */}
      <Box flex="1" maxWidth="400px">
  <Flex overflowX="auto" gap={4} height="250px">
    {imagesToShow && imagesToShow.length > 0 ? (
      imagesToShow.map((imgUrl, index) => (
        <Image
          key={index}
          src={imgUrl}
          alt={`${product.brand} ${product.article} ${selectedColor}`}
          borderRadius="md"
          objectFit="cover"
          width="200px" // Adjust as needed
        />
      ))
    ) : (
      <Text>No images available for this color.</Text>
    )}
  </Flex>
</Box>


      {/* Product Details */}
      <Box flex="2" p={2} bg="white" borderRadius="md" shadow="md" width={'full'}>
        <Heading as="h2" size="lg">{product.article}</Heading>
        <Text fontSize="lg" color="gray.600">{product.brand}</Text>

        <Badge colorScheme="green" fontSize="md" mt={2}>{product.condition}</Badge>
        
        <Text fontSize="2xl" fontWeight="bold" color="red" mt={2}>MRP: ₹{product.price}</Text>

        <Text color="gray.700" mt={2}>{product.description}</Text>

        {/* Color Selection */}
        <Text fontSize="md" fontWeight="bold" mt={4}>Colors:</Text>
<Grid templateColumns="repeat(2, 1fr)" gap={2} mt={2}>
  {product.colors && Object.keys(product.colors).map((color) => (
    <Button
      key={color}
      variant={selectedColor === color ? "solid" : "outline"}
      colorScheme="red"
      onClick={() => handleColorClick(color)}
    >
      {color}
    </Button>
  ))}
</Grid>

        {/* Size Selection */}
        <Text fontSize="md" fontWeight="bold" mt={4}>Available Sizes:</Text>
        <Select id="size-select" value={selectedSize} onChange={handleSizeChange} mt={2}>
          {sizes.length > 0 ? (
            sizes.map((item, index) => (
              <option key={index} value={item.size}>
                {item.size} (PCs: {item.lengths})
              </option>
            ))
          ) : (
            <option value="">N/A</option>
          )}
        </Select>

        {/* Quantity Selector */}
        <Flex alignItems="center" mt={4}>
          <Button onClick={() => handleQuantityChange('decrement')}>-</Button>
          <Input type="number" value={quantity} readOnly textAlign="center" width="50px" mx={2} />
          <Button onClick={() => handleQuantityChange('increment')}>+</Button>
        </Flex>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          colorScheme="red"
          width="full"
          mt={6}
        >
          Add To Cart
        </Button>

        {/* Chakra UI AlertDialog */}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          colorScheme='red'
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>Notification</AlertDialogHeader>
              <AlertDialogBody>{dialogMessage}</AlertDialogBody>
              <AlertDialogFooter>
                {dialogMessage.includes('logged in') ? (
                  <Button colorScheme="red" onClick={handleNavigateLogin}>
                    Go to Login
                  </Button>
                ) : (
                  <Button ref={cancelRef} onClick={onClose} colorScheme='red'>
                    OK
                  </Button>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </Flex>
  );
};

export default ProductCard;
