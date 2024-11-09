require("@nomicfoundation/hardhat-toolbox");



const NEXT_PUBLIC_POLYGON_MUMBAI_RPC = "https://polygon-amoy.g.alchemy.com/v2/cD_QiSIf9ZOH50wPe-xoS7vwMNfMRTmW";
const NEXT_PUBLIC_PRIVATE_KEY = "0f0fe7f3187f652d7fdea0db7167a62c093181f3353199f05f63fddc68be3f8a";

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    polygon_amoy: {
      url: NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
    },
  },
};
