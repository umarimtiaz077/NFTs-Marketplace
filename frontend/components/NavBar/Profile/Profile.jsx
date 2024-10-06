import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCopy, FaPowerOff } from "react-icons/fa";
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


  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  

  return (
    <div className={Style.whole}>
      {/* Profile Section */}
      <div className={Style.profile}>
        <img
          alt="Profile picture"
          src={profileData.profileImage || '/default-profile.png'}
          width={50}
          height={50}
        />
        <div>
          <div className={Style.name}>
            {profileData.username}
          </div>
          <div className={Style.viewProfile}>
            <Link href="/author">View profile</Link>
          </div>
        </div>
        <div className={Style.arrow}>
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>

      {/* Menu Section */}
      <ul className={Style.menu}>
        <li><Link href="/nfts">My NFTs</Link></li>
        <li><Link href="/collections">My Collections</Link></li>
        <li><Link href="/bids">My Bids and Listings</Link></li>
        <li><Link href="/activity">My Activity</Link></li>
        <li>Create <span className={Style.dropdown}>▼</span></li>
        <li><Link href="/sell">Sell</Link></li>
        <li><Link href="/followings">Followings</Link></li>
        <li><Link href="/settings">Settings</Link></li>
      </ul>   
      <button className={Style.disconnectButton} onClick={handleDisconnect}>
      <i className="fas fa-power-off"></i> Disconnect
    </button>      
    </div>
  );
};

export default Profile;
