require("@nomicfoundation/hardhat-toolbox");


const NEXT_PUBLIC_POLYGON_MUMBAI_RPC = "https://polygon-amoy.g.alchemy.com/v2/L9Y0nIO2M1NNqmIt5kCj2INffh8QTc13";
// const NEXT_PUBLIC_PRIVATE_KEY = "0f0fe7f3187f652d7fdea0db7167a62c093181f3353199f05f63fddc68be3f8a"; //RAFAY main
const NEXT_PUBLIC_PRIVATE_KEY = "979cc8af15ecd4a1dd9fe1e962c1124d909f01df5e603933e2869932c949d3d3"; //RAFAY sub


// const NEXT_PUBLIC_PRIVATE_KEY = "529fe6c6bd07b9d5cfe20ac1a01c10c1bb1e48ea5948d4b101de862b62924c27"; //Nauman
// 529fe6c6bd07b9d5cfe20ac1a01c10c1bb1e48ea5948d4b101de862b62924c27
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
