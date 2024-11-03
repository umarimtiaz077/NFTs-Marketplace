require("@nomicfoundation/hardhat-toolbox");


const NEXT_PUBLIC_POLYGON_MUMBAI_RPC = "https://polygon-amoy.g.alchemy.com/v2/cD_QiSIf9ZOH50wPe-xoS7vwMNfMRTmW";
const NEXT_PUBLIC_PRIVATE_KEY = "47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd"; 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "amoy",
  networks: {
    hardhat: {},
    polygon_amoy: {
      url: NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
    },
  },
};