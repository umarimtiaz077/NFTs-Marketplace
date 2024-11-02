import React from "react";

// INTERNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand } from "../components/componentsindex";
import { Banner } from "../collectionPage/collectionIndex";
import images from "../img";
import Collection from "../components/Collection/Collection"; // Import the Collection component

const collectionsPage = () => {
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      
      {/* Include the Collection component */}
      <Collection />

    
      <Brand />
    </div>
  );
};

export default collectionsPage;
