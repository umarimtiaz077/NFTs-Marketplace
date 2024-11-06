require("@nomicfoundation/hardhat-toolbox");

const NEXT_PUBLIC_POLYGON_MUMBAI_RPC = "https://polygon-amoy.g.alchemy.com/v2/5Ucu3u368czrJSbJqjz1AZg9hr0G_jtR";
const NEXT_PUBLIC_PRIVATE_KEY = "c76f187d064278565113f72ffbdee310602de88e373189d46303b51ee5cc951e";

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
