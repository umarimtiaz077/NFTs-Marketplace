require("@nomicfoundation/hardhat-toolbox");

<<<<<<< HEAD


const NEXT_PUBLIC_POLYGON_MUMBAI_RPC = "https://polygon-amoy.g.alchemy.com/v2/cD_QiSIf9ZOH50wPe-xoS7vwMNfMRTmW";
const NEXT_PUBLIC_PRIVATE_KEY = "0f0fe7f3187f652d7fdea0db7167a62c093181f3353199f05f63fddc68be3f8a";

=======
// const NEXT_PUBLIC_POLYGON_MUMBAI_RPC = "https://polygon-amoy.g.alchemy.com/v2/TAUQded-jixMdPKQjkbKWrejyiOOzwfo";
// const NEXT_PUBLIC_PRIVATE_KEY = "fc332c17c1d07d2eac4f288d7c1216f792c9eb2370253ed97a469b475a8099ad"; //RAFAY sub
>>>>>>> smart-contract-deploy
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.9",
<<<<<<< HEAD
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    polygon_amoy: {
      url: NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
    },
  },
=======
  // defaultNetwork: "matic",
  // networks: {
  //   hardhat: {},
  //   polygon_amoy: {
  //     url: NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
  //     accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
  //   },
  // },
>>>>>>> smart-contract-deploy
};
