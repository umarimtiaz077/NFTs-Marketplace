import React, { useEffect, useState, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/upload-nft.module.css";
import { UploadNFT } from "../createCollection/uploadNFTIndex";

//SMART CONTRACT IMPORT


const createCollection = () => {
  
  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>Create New Collection</h1>
          <p>
            You can set preferred Collection name, write your collection description and
            manage other personal settings.
          </p>
        </div>

        
      </div>
    </div>
  );
};

export default createCollection;
