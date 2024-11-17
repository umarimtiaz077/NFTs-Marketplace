import React from "react";
import Image from "next/image";
import { TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter, TiSocialInstagram } from "react-icons/ti";

// INTERNAL IMPORT
import Style from "./collectionProfile.module.css";

const CollectionProfile = ({ collection }) => {
  return (
    <div className={Style.collectionProfile}>
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          <Image
            src={collection.image || "/placeholder-image.jpg"} // Display the collection's image
            alt="Collection Image"
            width={800}
            height={800}
            className={Style.collectionProfile_box_left_img}
          />
<<<<<<< HEAD

<<<<<<< HEAD
          
=======
          <div className={Style.collectionProfile_box_left_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
          </div>
>>>>>>> collaborator-branch
        </div>

        <div className={Style.collectionProfile_box_middle}>
          <h1>Awesome NFTs Collection</h1>
          <p>
            Karafuru is home to 5,555 generative arts where colors reign
            supreme. Leave the drab reality and enter the world of Karafuru by
            Museum of Toys.
          </p>
<<<<<<< HEAD
        


           
=======

          <div className={Style.collectionProfile_box_middle_box}>
            {cardArray.map((el, i) => (
              <div
                className={Style.collectionProfile_box_middle_box_item}
                key={i + 1}
              >
                <small>Floor price</small>
                <p>${i + 1}95,4683</p>
                <span>+ {i + 2}.11%</span>
              </div>
            ))}
          </div>
>>>>>>> collaborator-branch
=======
        </div>

        <div className={Style.collectionProfile_box_middle}>
          <h1>{collection.name || "Unnamed Collection"}</h1>
          <p>{collection.description || "No description provided."}</p>
          <div className={Style.collectionProfile_box_social}>
            {/* Social Media Icons */}
            <TiSocialFacebook />
            <TiSocialTwitter />
            <TiSocialLinkedin />
            <TiSocialInstagram />
          </div>
>>>>>>> nft-pinata-branch
        </div>
      </div>
    </div>
  );
};

export default CollectionProfile;
