<<<<<<< HEAD
import React, { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";
import { useRouter } from "next/router";

// INTERNAL IMPORT
=======
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";
//----IMPORT ICON
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/router";

//INTERNAL IMPORT
>>>>>>> collaborator-branch
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button, Error } from "../componentsindex";
import images from "../../img";
<<<<<<< HEAD
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NavBar = () => {
=======

//IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NavBar = () => {
  //----USESTATE COMPONNTS
>>>>>>> collaborator-branch
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
<<<<<<< HEAD
  const navbarRef = useRef(null); // Create a ref for the navbar

  const router = useRouter();
  const { currentAccount, connectWallet, openError } = useContext(NFTMarketplaceContext);

  const handleClickOutside = (event) => {
    // Check if the click is outside the navbar and its menus
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
=======

  const router = useRouter();

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Discover") {
      setDiscover(true);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText == "Help Center") {
      setDiscover(false);
      setHelp(true);
      setNotification(false);
      setProfile(false);
    } else {
>>>>>>> collaborator-branch
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
<<<<<<< HEAD
=======
    }
  };

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelp(false);
      setDiscover(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
>>>>>>> collaborator-branch
      setOpenSideMenu(false);
    }
  };

<<<<<<< HEAD
  useEffect(() => {
    // Add event listener for clicks outside the navbar
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={Style.navbar} ref={navbarRef}>
=======
  //SMART CONTRACT SECTION
  const { currentAccount, connectWallet, openError } = useContext(
    NFTMarketplaceContext
  );

  return (
    <div className={Style.navbar}>
>>>>>>> collaborator-branch
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <DiJqueryLogo onClick={() => router.push("/")} />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}>
            <p onClick={() => { setDiscover(!discover); setHelp(false); setNotification(false); setProfile(false); }}>Discover</p>
=======
        {/* //END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}>
            {/* DISCOVER MENU */}
            <p onClick={(e) => openMenu(e)}>Discover</p>
>>>>>>> collaborator-branch
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

<<<<<<< HEAD
          <div className={Style.navbar_container_right_help}>
            <p onClick={() => { setHelp(!help); setDiscover(false); setNotification(false); setProfile(false); }}>Help Center</p>
=======
          {/* HELP CENTER MENU */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu(e)}>Help Center</p>
>>>>>>> collaborator-branch
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

<<<<<<< HEAD
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => { setNotification(!notification); setDiscover(false); setHelp(false); setProfile(false); }}
=======
          {/* NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
>>>>>>> collaborator-branch
            />
            {notification && <Notification />}
          </div>

<<<<<<< HEAD
          <div className={Style.navbar_container_right_button}>
            {currentAccount === "" ? (
=======
          {/* CREATE BUTTON SECTION */}
          <div className={Style.navbar_container_right_button}>
            {currentAccount == "" ? (
>>>>>>> collaborator-branch
              <Button btnName="Connect" handleClick={() => connectWallet()} />
            ) : (
              <Button
                btnName="Create"
                handleClick={() => router.push("/uploadNFT")}
              />
            )}
          </div>

<<<<<<< HEAD
=======
          {/* USER PROFILE */}

>>>>>>> collaborator-branch
          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={images.user1}
                alt="Profile"
                width={40}
                height={40}
<<<<<<< HEAD
                onClick={() => setProfile(!profile)}
                className={Style.navbar_container_right_profile}
              />
=======
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
              />

>>>>>>> collaborator-branch
              {profile && <Profile currentAccount={currentAccount} />}
            </div>
          </div>

<<<<<<< HEAD
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => setOpenSideMenu(!openSideMenu)}
=======
          {/* MENU BUTTON */}

          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
>>>>>>> collaborator-branch
            />
          </div>
        </div>
      </div>

<<<<<<< HEAD
=======
      {/* SIDBAR CPMPONE/NT */}
>>>>>>> collaborator-branch
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar
            setOpenSideMenu={setOpenSideMenu}
            currentAccount={currentAccount}
            connectWallet={connectWallet}
          />
        </div>
      )}

      {openError && <Error />}
    </div>
  );
};

export default NavBar;
