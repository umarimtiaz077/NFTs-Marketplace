require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');

module.exports = {
    solidity: "0.8.20",
    networks: {
        sepolia: {
            url: `https://sepolia.infura.io/v3/98c69f5ea7474d938ee0797955fc9ad8`,
            accounts: [process.env.PRIVATE_KEY],
        },
    },
};
