import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  IconButton,
  Button,
  Text,
  Image,
  useBreakpointValue,
  useDisclosure,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import RoleBasedComponent from '../RoleBasedComponents';



function Nav() {
  const token = localStorage.getItem('token');
  const { isOpen, onToggle, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logout = () => {
    const confirm = window.confirm('Are you sure you want to log out?');
    if (confirm) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/');
    }
  };

  const buttonVariant = useBreakpointValue({
    base: 'solid',
    md: 'ghost',
  });

  return (
    <Box bg="green.300" color="white" py={4} px={6} shadow="md">
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
       
        <Flex align="center" gap={3}>
         
          <Text fontSize="2xl" fontWeight="bold">
            Green Loop
          </Text>
        </Flex>

        {/* Hamburger Menu (Mobile) */}
        <IconButton
          display={{ base: 'block', md: 'none' }}
          aria-label="Toggle menu"
          icon={isOpen ? <CloseIcon boxSize={4} /> : <HamburgerIcon boxSize={6} />}
          onClick={onToggle}
          variant="solid"
          bg="whiteAlpha.300"
          color="white"
          _hover={{ bg: 'whiteAlpha.400' }}
        />

        {/* Desktop Navigation */}
        <Flex
          as="nav"
          align="center"
          gap={4}
          display={{ base: 'none', md: 'flex' }}
        >
          <Link to="/orders">
            <Button
              variant="ghost"
              colorScheme="whiteAlpha"
              _hover={{ bg: 'whiteAlpha.300' }}
            >
              Orders
            </Button>
          </Link>

          <RoleBasedComponent allowedRoles={['admin']}>
            <Link to="/register">
              <Button
                variant="ghost"
                colorScheme="whiteAlpha"
                _hover={{ bg: 'whiteAlpha.300' }}
              >
                Register Users
              </Button>
            </Link>
          </RoleBasedComponent>

          <Link to="/profile">
            <Button
              variant="ghost"
              colorScheme="whiteAlpha"
              _hover={{ bg: 'whiteAlpha.300' }}
            >
              Profile
            </Button>
          </Link>

          {token ? (
            <Button
              variant="solid"
              colorScheme="red"
              onClick={logout}
              _hover={{
                bg: 'red.500',
                color: 'whiteAlpha.900',
                transform: 'scale(1.05)',
                transition: 'all 0.2s',
              }}
            >
              Log-out
            </Button>
          ) : (
            <Button
              variant={buttonVariant}
              colorScheme="blue"
              onClick={() => navigate('/login')}
            >
              Log-in
            </Button>
          )}
        </Flex>
      </Flex>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <Box mt={4} display={{ base: 'block', md: 'none' }} bg="green.400" p={4} borderRadius="md">
          <VStack spacing={4} align="stretch">
            <Link to="/orders">
              <Button
                w="full"
                variant="solid"
                colorScheme="whiteAlpha"
                bg="whiteAlpha.300"
                _hover={{ bg: 'whiteAlpha.400' }}
                onClick={onClose}
              >
                Orders
              </Button>
            </Link>

            <RoleBasedComponent allowedRoles={['admin']}>
              <Link to="/register">
                <Button
                  w="full"
                  variant="solid"
                  colorScheme="whiteAlpha"
                  bg="whiteAlpha.300"
                  _hover={{ bg: 'whiteAlpha.400' }}
                  onClick={onClose}
                >
                  Register Users
                </Button>
              </Link>
            </RoleBasedComponent>

            <Link to="/profile">
              <Button
                w="full"
                variant="solid"
                colorScheme="whiteAlpha"
                bg="whiteAlpha.300"
                _hover={{ bg: 'whiteAlpha.400' }}
                onClick={onClose}
              >
                Profile
              </Button>
            </Link>

            <Divider borderColor="whiteAlpha.500" />

            {token ? (
              <Button
                w="full"
                variant="solid"
                colorScheme="red"
                onClick={logout}
                _hover={{
                  bg: 'red.500',
                  color: 'whiteAlpha.900',
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s',
                }}
              >
                Log-out
              </Button>
            ) : (
              <Button
                w="full"
                variant="solid"
                colorScheme="blue"
                onClick={() => {
                  navigate('/login');
                  onClose();
                }}
              >
                Log-in
              </Button>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  );
}

export default Nav;
