import React from "react";
import { Box, Flex, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function AdminCard({ to, label }) {
    return (
        <LinkBox
            as="article"
            p="6"
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            bgGradient="linear(to-r, #6a11cb, #2575fc)"
            _hover={{
                transform: "scale(1.05)",
                shadow: "2xl",
                bgGradient: "linear(to-r, #2575fc, #6a11cb)",
            }}
            transition="all 0.3s ease"
            w="220px"
            textAlign="center"
        >
            <LinkOverlay as={Link} to={to}>
                <Heading size="md" color="white">
                    {label}
                </Heading>
            </LinkOverlay>
        </LinkBox>
    );
}

function AdminDashboard() {
    return (
        <Flex
            wrap="wrap"
            justify="center"
            gap="6"
            p="6"
            bgGradient="linear(to-bl, #f0f4f7, #d9e4fc)"
            rounded="lg"
            shadow="lg"
        >
            <AdminCard to="/pending-orders" label="Pending Orders" />
            <AdminCard to="/accepted-orders" label="Accepted Orders" />
            <AdminCard to="/rejected-orders" label="Rejected Orders" />
            <AdminCard to="/customers" label="All Customers" />
            <AdminCard to="/edit-products" label="Edit Products" />
        </Flex>
    );
}

export default AdminDashboard;
