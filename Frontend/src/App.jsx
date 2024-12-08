import { Box, Button, ChakraProvider, Icon } from "@chakra-ui/react";
import React from "react";
import { FaPlus, FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";
import BrandScroller from "./components/BrandScroller";
import CategoryGrid from "./components/Category";
import Header from "./components/Header";
import Nav from "./components/Nav";
import ProductGrid from "./components/ProductGrid";
import Scroll from "./components/Scroll";
import "./components/Style.css";
import RoleBasedComponent from "./RoleBasedComponents";

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Nav />
      <Scroll />
      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        display="flex"
        flexDirection="column"
        gap="10px"
        zIndex="1000"
      >
        <RoleBasedComponent allowedRoles={["admin", "employee"]}>
          <Link to="/addproduct">
            <Button
              leftIcon={<Icon as={FaPlus} />}
              colorScheme="teal"
              size="lg"
              variant="solid"
              _hover={{ bg: "teal.600" }}
              boxShadow="lg"
            >
              Add Products
            </Button>
          </Link>
        </RoleBasedComponent>
        <RoleBasedComponent allowedRoles={["admin"]}>
          <Link to="/admin-dashboard">
            <Button
              leftIcon={<Icon as={FaTools} />}
              colorScheme="purple"
              size="lg"
              variant="solid"
              _hover={{ bg: "purple.600" }}
              boxShadow="lg"
            >
              Admin Tools
            </Button>
          </Link>
        </RoleBasedComponent>
      </Box>
      <CategoryGrid />
      <ProductGrid />
      <BrandScroller />
    </ChakraProvider>
  );
}

export default App;
