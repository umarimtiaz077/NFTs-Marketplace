import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
<<<<<<< HEAD
<<<<<<< HEAD
import { useRouter } from "next/router"; // Import useRouter from Next.js
=======
import { useRouter } from "next/router";
>>>>>>> nft-pinata-branch
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import Style from "./FollowerTabCard.module.css";
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const FollowerTabCard = ({ i, el, relationType, initialFollowing, onFollowStatusChange }) => {
  const [following, setFollowing] = useState(initialFollowing);
  const { followUser, unfollowUser, userId } = useContext(NFTMarketplaceContext);
  const router = useRouter();

  const isOwnProfile = el.seller === userId;

  const background = el.background || el.profileImage || "/default-background.jpg";
  const profileImage = el.profileImage || el.background || "/default-profile.jpg";

  // Check `initialFollowing` value on load to debug
  useEffect(() => {
    console.log(`[FollowerTabCard] Loaded for ${el.user || "Unnamed User"} with initialFollowing:`, initialFollowing);
    setFollowing(initialFollowing);
  }, [initialFollowing, el.user]);

  const toggleFollow = async (e) => {
    e.stopPropagation();
    try {
      if (following) {
        const response = await unfollowUser(el.seller);
        if (response && response.success) {
          setFollowing(false);
          if (onFollowStatusChange) onFollowStatusChange("Followers");
        }
      } else {
        const response = await followUser(el.seller);
        if (response && response.success) {
          setFollowing(true);
          if (onFollowStatusChange) onFollowStatusChange("Following");
        }
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  const redirectToDetailPage = () => {
    router.push({
      pathname: "/detailUser",
      query: { seller: el.seller },
    });
  };

  const renderFollowButton = () => {
    if (isOwnProfile) return "You";
    if (relationType === "follower") return following ? "Unfollow" : "Follow";
    if (relationType === "following") return following ? "Unfollow" : "Follow";
    return following ? "Unfollow" : "Follow";
  };

  return (
    <div className={Style.FollowerTabCard} onClick={redirectToDetailPage}>
      <div className={Style.FollowerTabCard_rank}>
        <p>#{i + 1} <span>🥇</span></p>
=======
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./FollowerTabCard.module.css";
import images from "../../../img";
const FollowerTabCard = ({ i, el }) => {
  const [following, setFollowing] = useState(false);

  const followMe = () => {
    if (!following) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  };
  return (
    <div className={Style.FollowerTabCard}>
      <div className={Style.FollowerTabCard_rank}>
        <p>
          #{i + 1} <span>🥇</span>
        </p>
>>>>>>> collaborator-branch
      </div>

      <div className={Style.FollowerTabCard_box}>
        <div className={Style.FollowerTabCard_box_img}>
          <Image
            className={Style.FollowerTabCard_box_img_img}
<<<<<<< HEAD
            src={el.background || images[`creatorbackground${i + 1}`]}
<<<<<<< HEAD
=======
            src={background}
>>>>>>> nft-pinata-branch
            alt="profile background"
=======
            alt="profile braground"
>>>>>>> collaborator-branch
            width={500}
            height={300}
            objectFit="cover"
          />
        </div>

        <div className={Style.FollowerTabCard_box_profile}>
          <Image
            className={Style.FollowerTabCard_box_profile_img}
            alt="profile picture"
            width={50}
            height={50}
            src={profileImage}
          />
        </div>

        <div className={Style.FollowerTabCard_box_info}>
          <div className={Style.FollowerTabCard_box_info_name}>
            <h4>
<<<<<<< HEAD
              {el.seller.slice(0, 9)}
<<<<<<< HEAD
=======
              {""}{" "}
>>>>>>> collaborator-branch
              <span>
                <MdVerified />
              </span>
=======
              {el.user || "Unnamed User"}
              <span><MdVerified /></span>
>>>>>>> nft-pinata-branch
            </h4>
            <p>{el.total || 0} ETH</p>
          </div>

          <div className={Style.FollowerTabCard_box_info_following}>
<<<<<<< HEAD
<<<<<<< HEAD
            <a onClick={(e) => { e.stopPropagation(); followMe(); }}>
              {following ? 'Following' : 'Follow'}
              <span>
                <TiTick />
              </span>
=======
            <a
              onClick={toggleFollow}
              style={{
                pointerEvents: isOwnProfile ? "none" : "auto",
                opacity: isOwnProfile ? 0.5 : 1,
              }}
            >
              {renderFollowButton()}
              <span><TiTick /></span>
>>>>>>> nft-pinata-branch
            </a>
=======
            {following ? (
              <a onClick={() => followMe()}>
                Follow{""}{" "}
                <span>
                  <TiTick />
                </span>
              </a>
            ) : (
              <a onClick={() => followMe()}>Following</a>
            )}
>>>>>>> collaborator-branch
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowerTabCard;
