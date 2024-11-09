import nftMarketplace from "./NFTMarketplace.json";

//NFT MARKETPLACE
//--------POLYGON AMOY TESTNET
// export const NFTMarketplaceAddress =
//   "0x620C57A2C821b4680090393891cA49Bd715c4813";
  export const NFTMarketplaceAddress =
  "0x5f7fEBEE00e20287712Cf6C95e21De741434a1fe";
//--------LOCALHOST
// export const NFTMarketplaceAddress =
//   "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const NFTMarketplaceABI = nftMarketplace.abi;

//NETWORK
const networks = {
  polygon_amoy: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Polygon Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  },
}