require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config(); // Load environment variables

const NEXT_PUBLIC_POLYGON_MUMBAI_RPC = "https://rpc-amoy.polygon.technology/";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "polygon_amoy", // Change this to the correct network
  networks: {
    matic: {
      url: "https://rpc-mumbai.maticvigil.com", // Replace with the correct RPC URL for the Matic/Polygon network
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY ? `0x${process.env.NEXT_PUBLIC_PRIVATE_KEY}` : ''],
    },
    polygon_amoy: {
      url: NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY ? `0x${process.env.NEXT_PUBLIC_PRIVATE_KEY}` : ''], // Use environment variable for private key
    },
  },
};

