const hre = require("hardhat");

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();

  await nftMarketplace.deployed();

  console.log(` deployed contract Address ${nftMarketplace.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

<<<<<<< HEAD
<<<<<<< HEAD
//npx hardhat run scripts/deploy.js --network polygon_amoy
=======
// npx hardhat run scripts/deploy.js --network polygon_amoy
>>>>>>> smart-contract-deploy
=======
// npx hardhat run scripts/deploy.js --network polygon_amoy
>>>>>>> nft-pinata-branch
//npx hardhat run scripts/deploy.js --network localhost
