require("@nomicfoundation/hardhat-toolbox");

const NEXT_PUBLIC_POLYGON_MUMBAI_RPC = "https://rpc-amoy.polygon.technology/";
const NEXT_PUBLIC_PRIVATE_KEY = "a267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1"; 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {},

    polygon_mumbai: {
      url: NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
    },
  },
};
