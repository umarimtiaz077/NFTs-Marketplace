import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button } from "../../components/componentsindex.js";
import images from "../../img";

const NavBar = () => {
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    wallet: '',
    profileImage: '',
  });

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetaMaskInstalled(true);
    }

    const savedWalletAddress = localStorage.getItem('walletAddress');
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
      setIsWalletConnected(true);
      fetchUserProfile(savedWalletAddress);
    }
  }, []);

  const fetchUserProfile = async (wallet) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${wallet}`);
      if (response.ok) {
        const data = await response.json();
        setProfileData({
          username: data.username || 'Unknown User',
          wallet: wallet,
          profileImage: data.profileImage || '/default-profile.png',
        });
        setIsFormFilled(!!data.username && !!data.email);
        if (data.username && data.email) {
          localStorage.setItem('formFilled', true);
        }
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const connectMetaMask = async () => {
    try {
      if (window.ethereum) {
        // Always request to connect to MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          const connectedWalletAddress = accounts[0];
          setWalletAddress(connectedWalletAddress);
          setIsWalletConnected(true);
          localStorage.setItem('walletAddress', connectedWalletAddress); // Save to local storage

          // Check if user exists and redirect accordingly
          const response = await fetch(`http://localhost:5000/api/users/${connectedWalletAddress}`);
          if (response.ok) {
            const data = await response.json();
            if (data.username && data.email) {
              setIsFormFilled(true);
              window.location.href = '/'; // Redirect to home page
            } else {
              window.location.href = `/account?wallet=${connectedWalletAddress}`; // Redirect to form page
            }
          } else {
            window.location.href = `/account?wallet=${connectedWalletAddress}`; // Redirect to form page
          }
        } else {
          console.log("No accounts found");
        }
      } else {
        alert("MetaMask is not installed. Please install MetaMask and try again.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText === "Discover") {
      setDiscover(true);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText === "Help Center") {
      setDiscover(false);
      setHelp(true);
      setNotification(false);
      setProfile(false);
    } else {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
  };

  const openNotification = () => {
    setNotification(prev => !prev);
    setDiscover(false);
    setHelp(false);
    setProfile(false);
  };

  const openProfile = () => {
    setProfile(prev => !prev);
    setDiscover(false);
    setHelp(false);
    setNotification(false);
  };

  const handleDisconnect = () => {
    // Clear user data from local storage and state
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('formFilled');
    setIsWalletConnected(false);
    setWalletAddress('');
    setProfileData({
      username: '',
      wallet: '',
      profileImage: '',
    });
    window.location.href = '/'; // Redirect to home or refresh the page
  };

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image
              src={images.logo}
              alt="NFT MARKET PLACE"
              width={100}
              height={100}
            />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div>
        </div>

        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}>
            <p onClick={(e) => openMenu(e)}>Discover</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu(e)}>Help Center</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>

          <div className={Style.navbar_container_right_button}>
            {isMetaMaskInstalled ? (
              <Button
                btnName={isWalletConnected ? (isFormFilled ? "Create" : "Complete Profile") : "Connect"}
                handleClick={isWalletConnected ? (isFormFilled ? () => window.location.href = 'uploadNFT' : () => window.location.href = `/account?wallet=${walletAddress}`) : connectMetaMask}
              />
            ) : (
              <p>Install MetaMask to connect</p>
            )}
          </div>

          {isWalletConnected && isFormFilled && (
            <div className={Style.navbar_container_right_profile_box}>
              <div className={Style.navbar_container_right_profile}>
                <Image
                  src={
                    profileData.profileImage.startsWith('data:image')
                      ? profileData.profileImage // Base64 image
                      : `data:image/jpeg;base64,${profileData.profileImage}` // URL image or base64 without prefix
                  }
                  alt="Profile"
                  width={40}
                  height={40}
                  onClick={() => openProfile()}
                  className={Style.navbar_container_right_profile}
                  onError={(e) => {
                    e.target.src = '/default-profile.png'; // Fallback image if there's an error
                  }}
                />
                {profile && <Profile walletAddress={walletAddress} handleDisconnect={handleDisconnect} />}
              </div>
            </div>
          )}

          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => setOpenSideMenu(true)}
            />
          </div>
        </div>
      </div>

      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar setOpenSideMenu={setOpenSideMenu} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
