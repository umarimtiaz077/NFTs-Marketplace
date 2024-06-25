require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.4",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["0x9b970ad5582c61ab899d9ac07f0b67820aab74a5a291ecaf1f7d44552283477e"]
    }
  }
};
