import React, { useState } from "react";
import Image from "next/image";
<<<<<<< HEAD
import { MdVerified, MdCloudUpload, MdOutlineReportProblem } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import { TiSocialFacebook, TiSocialInstagram, TiSocialTwitter } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";

// INTERNAL IMPORT
import Style from "./AuthorProfileCard.module.css";
import { Button } from "../../components/componentsindex.js";
import images from "../../img"; // Import local images if needed

const AuthorProfileCard = ({ currentAccount, profileImage, username, description, socialLinks }) => {
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);

  const copyAddress = () => {
    const copyText = document.getElementById("myInput");
=======
import {
  MdVerified,
  MdCloudUpload,
  MdOutlineReportProblem,
} from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./AuthorProfileCard.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";

const AuthorProfileCard = ({ currentAccount }) => {
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);

  //copyAddress function
  const copyAddress = () => {
    const copyText = document.getElementById("myInput");

>>>>>>> collaborator-branch
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };

  const openShare = () => {
<<<<<<< HEAD
    setShare((prev) => !prev);
    setReport(false);
  };

  const openReport = () => {
    setReport((prev) => !prev);
    setShare(false);
=======
    if (!share) {
      setShare(true);
      setReport(false);
    } else {
      setShare(false);
    }
  };

  const openReport = () => {
    if (!report) {
      setReport(true);
      setShare(false);
    } else {
      setReport(false);
    }
>>>>>>> collaborator-branch
  };
  const handlecheck=()=>
  {
    console.log("this check method hit")
  };

  return (
    <div className={Style.AuthorProfileCard}>
      <div className={Style.AuthorProfileCard_box}>
        <div className={Style.AuthorProfileCard_box_img}>
          <Image
<<<<<<< HEAD
<<<<<<< HEAD
            src={profileImage || "/default-profile.png"} // Use default if no image provided
=======
            src={profileImage || images.defaultProfile || "/default-profile.png"} // Fallback to a local image or default path
>>>>>>> nft-pinata-branch
            className={Style.AuthorProfileCard_box_img_img}
            alt="Profile Image"
=======
            src={images.nft_image_1}
            className={Style.AuthorProfileCard_box_img_img}
            alt="NFT IMAGES"
>>>>>>> collaborator-branch
            width={220}
            height={220}
          />
        </div>

        <div className={Style.AuthorProfileCard_box_info}>
          <h2>
<<<<<<< HEAD
            {username || "Unnamed User"}{" "}
            <span>
              <MdVerified />
            </span>
          </h2>

          <div className={Style.AuthorProfileCard_box_info_address}>
            <input type="text" value={currentAccount} id="myInput" readOnly />
            <FiCopy
              onClick={copyAddress}
=======
            Dony Herrera{""}{" "}
            <span>
              <MdVerified />
            </span>{" "}
          </h2>

          <div className={Style.AuthorProfileCard_box_info_address}>
            <input type="text" value={currentAccount} id="myInput" />
            <FiCopy
              onClick={() => copyAddress()}
>>>>>>> collaborator-branch
              className={Style.AuthorProfileCard_box_info_address_icon}
            />
          </div>

<<<<<<< HEAD
          <p>{description || "No description provided."}</p>

          <div className={Style.AuthorProfileCard_box_info_social}>
            {socialLinks?.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                <TiSocialFacebook />
              </a>
            )}
            {socialLinks?.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                <TiSocialInstagram />
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <TiSocialTwitter />
              </a>
            )}
=======
          <p>
            Punk #4786 / An OG Cryptopunk Collector, hoarder of NFTs.
            Contributing to @ether_cards, an NFT Monetization Platform.
          </p>

          <div className={Style.AuthorProfileCard_box_info_social}>
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
              <TiSocialYoutube />
            </a>
>>>>>>> collaborator-branch
          </div>
        </div>

        <div className={Style.AuthorProfileCard_box_share}>
<<<<<<< HEAD
          <Button btnName="Follow" handleClick={() => {}} />
<<<<<<< HEAD
=======
          <MdCloudUpload
            onClick={() => openShare()}
            className={Style.AuthorProfileCard_box_share_icon}
          />

          {share && (
            <div className={Style.AuthorProfileCard_box_share_upload}>
              <p>
                <span>
                  <TiSocialFacebook />
                </span>{" "}
                {""}
                Facebook
              </p>
              <p>
                <span>
                  <TiSocialInstagram />
                </span>{" "}
                {""}
                Instragram
              </p>
              <p>
                <span>
                  <TiSocialLinkedin />
                </span>{" "}
                {""}
                LinkedIn
              </p>
              <p>
                <span>
                  <TiSocialYoutube />
                </span>{" "}
                {""}
                YouTube
              </p>
            </div>
          )}

          <BsThreeDots
            onClick={() => openReport()}
            className={Style.AuthorProfileCard_box_share_icon}
          />

          {report && (
            <p className={Style.AuthorProfileCard_box_share_report}>
              <span>
                <MdOutlineReportProblem />
              </span>{" "}
              {""}
              Report abouse
            </p>
          )}
>>>>>>> collaborator-branch
=======
          <Button btnName="Follow" handleClick={() => {handlecheck()}} />
>>>>>>> nft-pinata-branch
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileCard;
