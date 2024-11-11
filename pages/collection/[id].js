import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// INTERNAL IMPORT
import Style from "../../styles/collection.module.css";
import images from "../../img";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../../collectionPage/collectionIndex";
import { Slider, Brand } from "../../components/componentsindex";
import Filter from "../../components/Filter/Filter";

const Collection = () => {
  const [collectionData, setCollectionData] = useState(null); // State for collection data
  const [NFTData, setNFTData] = useState([]); // State for NFTs in the collection
  const router = useRouter();
  const { id } = router.query; // Extract collection ID from URL

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/collection/${id}`);
        setCollectionData(response.data.collection);
      } catch (error) {
        console.error("Error fetching collection data:", error);
      }
    };
  
    if (id) fetchCollectionData();
  }, [id]);
  

  return (
    <div className={Style.collection}>
      <Banner bannerImage={collectionData?.banner || images.creatorbackground1} />
      {collectionData && <CollectionProfile collection={collectionData} />}
      <Filter />
      <NFTCardTwo NFTData={NFTData} />
      <Brand />
    </div>
  );
};

export default Collection;
