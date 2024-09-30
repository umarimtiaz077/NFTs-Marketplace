import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { BsImage } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

// INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";

const NFTCardTwo = () => {
  const [nftData, setNftData] = useState([]);

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/nfts");
        setNftData(response.data);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    fetchNFTData();
  }, []);

  return (
<></>   
  );
};

export default NFTCardTwo;
