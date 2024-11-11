import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import Style from "./FollowerTabCard.module.css";
import images from "../../../img";
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const FollowerTabCard = ({ i, el }) => {
  const [following, setFollowing] = useState(false);
  const { followUser, unfollowUser, isFollowingUser, userId } = useContext(NFTMarketplaceContext);
  const router = useRouter();

  // Check if this is the user's own profile
  const isOwnProfile = el.seller === userId;

  // Debugging logs
  console.log("Displayed Profile User ID (el.seller):", el.seller, "Type:", typeof el.seller);
  console.log("Current User ID from Context (userId):", userId, "Type:", typeof userId);
  console.log("Is Own Profile:", isOwnProfile);

  useEffect(() => {
    if (!isOwnProfile) {
      const fetchFollowingStatus = async () => {
        if (el.seller) {
          try {
            const isFollowing = await isFollowingUser(el.seller);
            console.log("Following status for user ID:", el.seller, "is", isFollowing); 
            setFollowing(isFollowing); // Set initial follow status
          } catch (error) {
            console.error("Error fetching following status for user ID:", el.seller, error);
          }
        }
      };
      fetchFollowingStatus();
    }
  }, [el.seller, isOwnProfile]);

  const toggleFollow = async (e) => {
    e.stopPropagation();
    try {
      if (following) {
        const response = await unfollowUser(el.seller);
        if (response && response.success) {
          console.log("Unfollowed user successfully");
          setFollowing(false);
        } else {
          console.error("Failed to unfollow user:", response?.message || "Unknown error");
        }
      } else {
        const response = await followUser(el.seller);
        if (response && response.success) {
          console.log("Followed user successfully");
          setFollowing(true);
        } else {
          console.error("Failed to follow user:", response?.message || "Unknown error");
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

  const backgroundSrc = typeof el.background === "string" ? el.background : images[`creatorbackground${i + 1}`] || "/default-background.jpg";
  const profileImageSrc = typeof el.profileImage === "string" ? el.profileImage : images[`user${i + 1}`] || "/default-profile.jpg";
  const userName = typeof el.user === "string" ? el.user : "Unnamed User";

  return (
    <div className={Style.FollowerTabCard} onClick={redirectToDetailPage}>
      <div className={Style.FollowerTabCard_rank}>
        <p>#{i + 1} <span>🥇</span></p>
      </div>

      <div className={Style.FollowerTabCard_box}>
        <div className={Style.FollowerTabCard_box_img}>
          <Image
            className={Style.FollowerTabCard_box_img_img}
            src={backgroundSrc}
            alt="profile background"
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
            src={profileImageSrc}
          />
        </div>

        <div className={Style.FollowerTabCard_box_info}>
          <div className={Style.FollowerTabCard_box_info_name}>
            <h4>
              {userName}
              <span>
                <MdVerified />
              </span>
            </h4>
            <p>{el.total || 0} ETH</p>
          </div>

          <div className={Style.FollowerTabCard_box_info_following}>
            <a
              onClick={toggleFollow}
              style={{
                pointerEvents: isOwnProfile ? "none" : "auto",
                opacity: isOwnProfile ? 0.5 : 1,
              }}
            >
              {isOwnProfile ? "You" : following ? "Unfollow" : "Follow"}
              <span>
                <TiTick />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowerTabCard;
