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
       <div className={Style.profileHead}>
          <div className={Style.profile}>
            <img
              alt="Profile picture"
              height="100"
              src="https://storage.googleapis.com/a1aa/image/PXzvOJEPpwLxPh21WRJe7t2ysQUZg0ZdQYg8BOTCVULNzeiTA.jpg"
              width="100"
            />
            <div className={Style.profile_info}>
              <h1>0xbea2e40be...1b43</h1>
              <span className={Style.verified}>
                <i className="fas fa-check-circle"></i>
                Get verified
              </span>
            </div>
            <div className={Style.profile_actions}>
              <button>Edit profile</button>
              <button>Sell</button>
              <button>
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </div>
          </div>
          <div className={Style.followers_following}>
            <div className={Style.info}>
              <span>Followers</span>
              <span>0</span>
            </div>
            <div className={Style.info}>
              <span>Following</span>
              <span>0</span>
            </div>
            <div className={Style.address}>
              <span>Address</span>
              <span>
                0xbea2e...1b43 <i className="fas fa-chevron-down"></i>
              </span>
            </div>
          </div>
        </div>
    </div>
  );
};

export default AuthorProfileCard;
