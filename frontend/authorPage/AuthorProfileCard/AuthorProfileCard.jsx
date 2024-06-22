import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  MdVerified,
  MdCloudUpload,
  MdOutlineReportProblem,
} from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import {
  TiSocialFacebook,
  TiSocialTwitter, // Added Twitter icon
  TiSocialInstagram,
} from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";

// INTERNAL IMPORT
import Style from "./AuthorProfileCard.module.css";
import { Button } from "../../components/componentsindex.js";

const AuthorProfileCard = () => {
  const [profileData, setProfileData] = useState({
    username: '',
    wallet: '',
    profileImage: '',
    description: '',
    socialLinks: {
      facebook: '',
      twitter: '', // Added Twitter here
      instagram: '',
    }
  });
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);

  useEffect(() => {
    // Retrieve wallet address from localStorage
    const walletAddress = localStorage.getItem('walletAddress');

    if (walletAddress) {
      fetchUserProfile(walletAddress);
    }
  }, []);

  const fetchUserProfile = async (walletAddress) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${walletAddress}`);
      if (response.ok) {
        const data = await response.json();
        setProfileData({
          username: data.username || 'Unknown User',
          wallet: walletAddress,
          profileImage: data.profileImage || '/default-profile.png',
          description: data.description || 'No description provided.',
          socialLinks: data.socialLinks || {
            facebook: '',
            twitter: '', // Ensure we have a placeholder for Twitter
            instagram: ''
          }
        });
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Function to format the wallet address with dots in the middle
  const obfuscateWalletAddress = (address) => {
    if (!address) return '';
    const start = address.slice(0, 10); // First 10 characters
    const end = address.slice(-10); // Last 10 characters
    return `${start}...${end}`;
  };

  // Function to copy the full wallet address to the clipboard
  const copyAddress = () => {
    const copyText = profileData.wallet;
    navigator.clipboard.writeText(copyText);
  };

  const openShare = () => {
    setShare((prevShare) => !prevShare);
    setReport(false);
  };

  const openReport = () => {
    setReport((prevReport) => !prevReport);
    setShare(false);
  };

  return (
    <div className={Style.AuthorProfileCard}>
      <div className={Style.AuthorProfileCard_box}>
        <div className={Style.AuthorProfileCard_box_img}>
          <Image
            src={
              profileData.profileImage.startsWith('data:image')
                ? profileData.profileImage // Base64 image
                : `data:image/jpeg;base64,${profileData.profileImage}` // URL image or base64 without prefix
            }
            className={Style.AuthorProfileCard_box_img_img}
            alt="NFT IMAGES"
            width={220}
            height={220}
            onError={(e) => {
              e.target.src = '/default-profile.png'; // Fallback image if there's an error
            }}
          />
        </div>

        <div className={Style.AuthorProfileCard_box_info}>
          <h2>
            {profileData.username}{" "}
            <span>
              <MdVerified />
            </span>{" "}
          </h2>

          <div className={Style.AuthorProfileCard_box_info_address}>
            <input
              type="text"
              value={obfuscateWalletAddress(profileData.wallet)}
              id="myInput"
              readOnly
            />
            <FiCopy
              onClick={copyAddress}
              className={Style.AuthorProfileCard_box_info_address_icon}
            />
          </div>

          <p>{profileData.description}</p>

          <div className={Style.AuthorProfileCard_box_info_social}>
            {profileData.socialLinks.facebook && (
              <a href={profileData.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                <TiSocialFacebook />
              </a>
            )}
            {profileData.socialLinks.twitter && ( // Display Twitter link
              <a href={profileData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <TiSocialTwitter />
              </a>
            )}
            {profileData.socialLinks.instagram && (
              <a href={profileData.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                <TiSocialInstagram />
              </a>
            )}
          </div>
        </div>

        <div className={Style.AuthorProfileCard_box_share}>
          <Button btnName="Follow" handleClick={() => {}} />
          <MdCloudUpload
            onClick={openShare}
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
                Instagram
              </p>
              <p>
                <span>
                  <TiSocialTwitter />
                </span>{" "}
                {""}
                Twitter
              </p>
            </div>
          )}

          <BsThreeDots
            onClick={openReport}
            className={Style.AuthorProfileCard_box_share_icon}
          />

          {report && (
            <p className={Style.AuthorProfileCard_box_share_report}>
              <span>
                <MdOutlineReportProblem />
              </span>{" "}
              {""}
              Report abuse
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileCard;
