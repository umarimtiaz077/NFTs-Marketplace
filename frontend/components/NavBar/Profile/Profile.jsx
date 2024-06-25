import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownload } from "react-icons/tb";
import Link from "next/link";
import Style from "./Profile.module.css";

const Profile = ({ walletAddress }) => {
  const [profileData, setProfileData] = useState({
    username: '',
    wallet: '',
    profileImage: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${walletAddress}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData({
            username: data.username || 'Unknown User',
            wallet: walletAddress,
            profileImage: data.profileImage || '/default-profile.png',
          });
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (walletAddress) {
      fetchProfileData();
    }
  }, [walletAddress]);

  // Function to shorten the wallet address
  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Function to handle the disconnect action
  const handleDisconnect = () => {
    // Clear user data from local storage
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('formFilled');

    // Optionally, reset the state in parent components or redirect as needed
    window.location.href = '/'; // Redirect to home or refresh the page
  };

  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        {profileData.profileImage ? (
          <Image
            src={
              profileData.profileImage.startsWith('data:image')
                ? profileData.profileImage // Base64 image
                : `data:image/jpeg;base64,${profileData.profileImage}` // URL image or base64 without prefix
            }
            alt="user profile"
            width={50}
            height={50}
            className={Style.profile_account_img}
            onError={(e) => {
              e.target.src = '/default-profile.png'; // Fallback image if there's an error
            }}
          />
        ) : (
          <Image
            src="/default-profile.png"
            alt="user profile"
            width={50}
            height={50}
            className={Style.profile_account_img}
          />
        )}

        <div className={Style.profile_account_info}>
          <p>{profileData.username}</p>
          <small>{shortenAddress(profileData.wallet)}</small>
        </div>
      </div>

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link href={{ pathname: "/author" }}>My Profile</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
              <Link href={{ pathname: "/author" }}>My Items</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link href={{ pathname: "/account" }}>Edit Profile</Link>
            </p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter />
            <p>
              <Link href={{ pathname: "/help" }}>Help</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <TbDownload />
            <p onClick={handleDisconnect}>
              Disconnect
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
