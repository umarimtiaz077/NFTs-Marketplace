<<<<<<< HEAD
<<<<<<< HEAD
import React, { useContext } from "react";
=======
import React, { useContext, useEffect, useState } from "react";
>>>>>>> nft-pinata-branch
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { MdHelpCenter } from "react-icons/md";
import { TbDownload } from "react-icons/tb";
import Link from "next/link";
import axios from "axios";
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";
=======
import React from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
import Link from "next/link";
>>>>>>> collaborator-branch

// INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from "../../../img";

const Profile = ({ currentAccount }) => {
<<<<<<< HEAD
  const { disconnectWallet } = useContext(NFTMarketplaceContext); 
  const [profileData, setProfileData] = useState(null);

  // Fetch profile data based on currentAccount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${currentAccount}`);
        setProfileData(response.data.user);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (currentAccount) fetchProfileData();
  }, [currentAccount]);

=======
>>>>>>> collaborator-branch
  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <Image
          src={profileData?.profileImage || images.user1}  // Use actual profile image or fallback
          alt="user profile"
          width={50}
          height={50}
          className={Style.profile_account_img}
        />

        <div className={Style.profile_account_info}>
          <p>{profileData?.username || "Unnamed User"}</p> {/* Show actual username */}
          <small>{currentAccount.slice(0, 18)}..</small>
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
              <Link href={{ pathname: "/contactus" }}>Help</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <TbDownload />
            <p>
              <Link href={{ pathname: "/aboutus" }}>About Us</Link>
            </p>
          </div>
<<<<<<< HEAD
          <div className={Style.profile_menu_one_item} onClick={disconnectWallet}>
            <BiLogOut />
            <p>Logout</p>
          </div>
=======
>>>>>>> collaborator-branch
        </div>
      </div>
    </div>
  );
};

export default Profile;
