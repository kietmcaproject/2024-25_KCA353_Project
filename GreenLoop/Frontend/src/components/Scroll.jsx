import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import PENDRIVE from "./images/HDD.jpg";
import HARDDISK from "./images/RAM.jpeg.jpg";
import RAM from "./images/pendrive.jpg";

function Scroll() {
  return (
    <Box
      width="100vw" // Full width of the viewport
      bg="gray.100"
      py={6}
      px={{ base: 4, md: 8 }}
      boxShadow="md"
    >
      <Flex
        justify="space-around" // Distribute images evenly
        align="center"
        // gap={6} // Add spacing between images
      >
        <Image
          as="img"
          src={HARDDISK}
          alt="Hard Disk"
          borderRadius="lg"
          objectFit="cover"
          width={"10vw"}
          _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
          transition="transform 0.3s ease, box-shadow 0.3s ease"
        />

        <Image
          as="img"
          src={RAM}
          alt="RAM"
          borderRadius="lg"
          width={"10vw"}
          objectFit="cover"
          _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
          transition="transform 0.3s ease, box-shadow 0.3s ease"
        />

        <Image
          as="img"
          src={PENDRIVE}
          alt="Pen Drive"
          width={"10vw"}
          borderRadius="lg"
          objectFit="cover"
          _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
          transition="transform 0.3s ease, box-shadow 0.3s ease"
        />
      </Flex>
    </Box>
  );
}

export default Scroll;
