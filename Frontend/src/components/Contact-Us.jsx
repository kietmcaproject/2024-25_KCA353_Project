import React from "react";
import { Box, Text, Flex, Heading, Link, Icon, Button } from "@chakra-ui/react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { FaWhatsapp } from "react-icons/fa"; // Importing WhatsApp icon from react-icons

const ContactUs = () => {
  return (
    <Box p={6} maxW="1200px" mx="auto" color="black" bg="white">
      {/* Section: Our Address */}
      <Box border="1px solid #ccc" borderRadius="8px" p={6} mb={6} bg="red.50">
        <Heading as="h2" size="lg" color="red.600" mb={3}>
          Our Address
        </Heading>
        <Text color="black">
          TechQuest, Ghaziabad
          <br />
          KIET, MURADNAGAR
          <br />
          GHAZIABAD, 201206
          <br />
          India
        </Text>
      </Box>

      {/* Section: Contact Methods */}
      <Flex
        direction={["column", "row"]}
        justify="center"
        align="center"
        mb={6}
        gap={4} // Adds space between the buttons
      >
        {/* Call Us */}
        <Button
          as={Link}
          href="tel:+91 9839326394"
          bg="red.400"
          color="white"
          _hover={{ bg: "red.500" }}
          p={4}
          borderRadius="8px"
          minW="200px" // Ensures the button has a minimum width to contain the text
          textAlign="center"
        >
          <Icon as={PhoneIcon} boxSize={6} mr={3} />
          Call Us
        </Button>

        {/* WhatsApp Us */}
        <Button
          as={Link}
          href="https://wa.me/+919839326394?text=Hello%20I%20need%20help%20with%20..."
          target="_blank"
          rel="noopener noreferrer"
          bg="green.500"
          color="white"
          _hover={{ bg: "green.600" }}
          p={4}
          borderRadius="8px"
          minW="200px" // Ensures the button has a minimum width to contain the text
          textAlign="center"
        >
          <Icon as={FaWhatsapp} boxSize={6} mr={3} />
          WhatsApp Us
        </Button>

        {/* Email Us */}
        <Button
          as={Link}
          href="mailto:ABHISHEK.KATIYAR.1203@gmail.com?subject=Need%20Assistance&body=Hello%2C%20I%20need%20help%20with%20..."
          bg="orange.400"
          color="white"
          _hover={{ bg: "orange.500" }}
          p={4}
          borderRadius="8px"
          minW="200px" // Ensures the button has a minimum width to contain the text
          textAlign="center"
        >
          <Icon as={EmailIcon} boxSize={6} mr={3} />
          Email Us
        </Button>
      </Flex>

      {/* Section: Map */}
      <Box mt={6}>
        <Heading as="h2" size="lg" color="red.600" mb={4}>
          Find Us on the Map
        </Heading>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.8738998118374!2d77.49449147550524!3d28.7531816755991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf574d18f2b6f%3A0x4a65c0bc0122eb2f!2sKIET%20Group%20of%20Institutions!5e0!3m2!1sen!2sin!4v1732023223413!5m2!1sen!2sin"
          width="100%"
          height="400"
          frameBorder="0"
          style={{ border: "0" }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
     
      </Box>
    </Box>
  );
};

export default ContactUs;
