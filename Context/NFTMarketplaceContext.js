import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";

//INTERNAL  IMPORT
import {
  NFTMarketplaceAddress,
  NFTMarketplaceABI,
  transferFundsAddress,
  transferFundsABI,
  handleNetworkSwitch,
} from "./constants";

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

//---CONNECTING WITH SMART CONTRACT

const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect, and sell NFTs";

  //------USESTAT
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [userId, setUserId] = useState(""); // New state for userId

  const [accountBalance, setAccountBalance] = useState("");
  const router = useRouter();

  //---CHECK IF WALLET IS CONNECTD

  const checkIfWalletConnected = async () => {
    
  
    try {
      if (!window.ethereum)
        return setOpenError(true), setError("Install MetaMask");
      const network = await handleNetworkSwitch();

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const getBalance = await provider.getBalance(accounts[0]);
        const bal = ethers.utils.formatEther(getBalance);
        setAccountBalance(bal);
        return accounts[0];
      } else {
        // setError("No Account Found");
        // setOpenError(true);
        console.log("No account");
      }
    } catch (error) {
      // setError("Something wrong while connecting to wallet");
      // setOpenError(true);
      console.log("not connected");
    }
  };

  //---CONNET WALLET FUNCTION
  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
      await registerOrFetchUser(accounts[0]); // Fetch userId after connection
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const registerOrFetchUser = async (walletAddress) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        walletAddress,
      });
      if (response.data.user) {
        console.log("asdad",response)
        setUserId(response.data.user._id); // Save userId globally
      }
    } catch (error) {
      console.error("Error registering or fetching user:", error);
    }
  };

  const disconnectWallet = () => {
    try {
      setCurrentAccount(""); // Clear the current account state
      setAccountBalance(""); // Clear account balance or any other wallet-related states
      localStorage.setItem("isLoggedOut", "true"); // Set logout status in localStorage
      console.log("Wallet disconnected successfully");
    } catch (error) {
      setError("Error while disconnecting wallet");
      setOpenError(true);
    }
  };

  //---UPLOAD TO IPFS FUNCTION
  const uploadToPinata = async (file) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `903b67a3e1321e0f4c47`,
          pinata_secret_api_key: `2920c0e2e3d333c8b2b059a20b1e5ba1574b9e157075dac6b6cdef969123224a`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        console.log("image url iss..",ImgHash);
        
        return ImgHash;
      } catch (error) {
        setError("Unable to upload image to Pinata");
        setOpenError(true);
        console.log(error);
      }
    }
    setError("File Is Missing, Kindly provide your file");
    setOpenError(true);
  };

  //---CREATENFT FUNCTION
  const createNFT = async (name, price, image, description, router) => {
    if (!name || !description || !price || !image)
      return setError("Data Is Missing"), setOpenError(true);

    const data = JSON.stringify({ name, description, image });

    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: `903b67a3e1321e0f4c47`,
          pinata_secret_api_key: `2920c0e2e3d333c8b2b059a20b1e5ba1574b9e157075dac6b6cdef969123224a`,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log(url);

      await createSale(url, price);
      router.push("/searchPage");
    } catch (error) {
      setError("Error while creating NFT");
      setOpenError(true);
    }
  };

  //--- createSale FUNCTION
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const price = ethers.utils.parseUnits(formInputPrice, "ether");

      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingPrice();

      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });

      await transaction.wait();
      console.log(transaction);
    } catch (error) {
      setError("error while creating sale");
      setOpenError(true);
      console.log(error);
    }
  };

  //--FETCHNFTS FUNCTION

  const fetchNFTs = async () => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const contract = fetchContract(provider);

        const data = await contract.fetchMarketItems();

        console.log(data);

        const items = await Promise.all(
          data.map(
            async ({ tokenId, seller, owner, price: unformattedPrice }) => {
              const tokenURI = await contract.tokenURI(tokenId);

              const {
                data: { image, name, description },
              } = await axios.get(tokenURI, {});
              const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                "ether"
              );

              return {
                price,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
              };
            }
          )
        );
        console.log("NFT", items);
        return items;
      }

      // }
    } catch (error) {
      setError("Error while fetching NFTS");
      setOpenError(true);
      console.log(error);
    }
  };

  //--FETCHING MY NFT OR LISTED NFTs
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();

        const data =
          type == "fetchItemsListed"
            ? await contract.fetchItemsListed()
            : await contract.fetchMyNFTs();

        const items = await Promise.all(
          data.map(
            async ({ tokenId, seller, owner, price: unformattedPrice }) => {
              const tokenURI = await contract.tokenURI(tokenId);
              const {
                data: { image, name, description },
              } = await axios.get(tokenURI);
              const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                "ether"
              );

              return {
                price,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
              };
            }
          )
        );
        return items;
      }
    } catch (error) {
      setError("Error while fetching listed NFTs");
      setOpenError(true);
      console.log(error);
    }
  };

  //---BUY NFTs FUNCTION
  const buyNFT = async (nft) => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();
        const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

        const transaction = await contract.createMarketSale(nft.tokenId, {
          value: price,
        });

        await transaction.wait();
        router.push("/author");
      }
    } catch (error) {
      setError("Error While buying NFT");
      setOpenError(true);
    }
  };

  const fetchAllProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
  
      // Logging each user's data as it is processed
      return response.data.map((user) => {
        console.log("Fetched User Data:", {
          username: user.username || "Unnamed User",
          profileImage: user.profileImage || "/default-background.jpg",
          sellerId: user._id || user.walletAddress || "unknown",
        });
  
        return {
          background: user.profileImage || "/default-background.jpg", // Set background with a default fallback
          user: user.username || "Unnamed User", // Set a username with a default fallback
          seller: user._id || user.walletAddress || "unknown", // Ensure seller is set to _id or walletAddress
        };
      });
    } catch (error) {
      console.error("Error fetching profiles:", error);
      return [];
    }
  };
  
  const followUser = async (followId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/follow", {
        userId,
        followId,
      });
      if (response.data.success) {
        console.log("Followed successfully:", response.data);
        return { success: true, message: "Followed successfully" };
      } else {
        console.error("Failed to follow:", response.data.message);
        return { success: false, message: response.data.message || "Failed to follow" };
      }
    } catch (error) {
      console.error("Error following user:", error);
      return { success: false, message: "Error following user" };
    }
  };
  
  const unfollowUser = async (unfollowId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/unfollow", {
        userId,
        unfollowId,
      });
      if (response.data.success) {
        console.log("Unfollowed successfully:", response.data);
        return { success: true, message: "Unfollowed successfully" };
      } else {
        console.error("Failed to unfollow:", response.data.message);
        return { success: false, message: response.data.message || "Failed to unfollow" };
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
      return { success: false, message: "Error unfollowing user" };
    }
  };
  
  const isFollowingUser = async (targetUserId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}/followers`);
      return response.data.some((follower) => follower._id === targetUserId);
    } catch (error) {
      console.error("Error checking if following user:", error);
      return false;
    }
  };
  

  useEffect(() => {
    const handleRouteChange = () => {
      if (currentAccount) {
        registerOrFetchUser(currentAccount);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, currentAccount]);

  return (
    <NFTMarketplaceContext.Provider
      value={{
        fetchAllProfiles,
        uploadToPinata,
        checkIfWalletConnected,
        connectWallet,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        currentAccount,
        titleData,
        setOpenError,
        openError,
        error,
        accountBalance,
        disconnectWallet,
        userId,
        followUser,
        unfollowUser,
        isFollowingUser
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
