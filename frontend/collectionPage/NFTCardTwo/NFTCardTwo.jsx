import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from 'axios';
import { BsImage } from "react-icons/bs";

// INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";

const NFTCardTwo = () => {
  const [nftData, setNftData] = useState([]);

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/nfts');
        setNftData(response.data);
      } catch (error) {
        console.error('Error fetching NFT data:', error);
      }
    };

    fetchNFTData();
  }, []);

  return (
    <div className={Style.NFTCardTwo}>
      {nftData.map((el) => (
        <div className={Style.NFTCardTwo_box} key={el._id}>
          <div className={Style.NFTCardTwo_box_like}>
            <div className={Style.NFTCardTwo_box_like_box}>
              <div className={Style.NFTCardTwo_box_like_box_box}>
                <BsImage className={Style.NFTCardTwo_box_like_box_box_icon} />
              </div>
            </div>
          </div>

          <div className={Style.NFTCardTwo_box_img}>
            <Image
              src={el.imageUrl || '/default-image.png'} // Handle case where imageUrl is null
              alt={el.itemName}
              width={500}
              height={500}
              objectFit="cover"
              className={Style.NFTCardTwo_box_img_img}
            />
          </div>

          <div className={Style.NFTCardTwo_box_info}>
            <div className={Style.NFTCardTwo_box_info_left}>
              <p>{el.itemName}</p>
            </div>
          </div>

          <div className={Style.NFTCardTwo_box_price}>
            <div className={Style.NFTCardTwo_box_price_box}>
              <small>Price</small>
              <p>{el.price} ETH</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTCardTwo;
