import React, { useState } from "react";
import Image from "next/image";
<<<<<<< HEAD
import { useRouter } from "next/router"; // Import useRouter from Next.js
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import Style from "./FollowerTabCard.module.css";
import images from "../../../img";

const FollowerTabCard = ({ i, el }) => {
  const [following, setFollowing] = useState(false);
  const router = useRouter(); // Initialize router

  const followMe = () => {
    setFollowing(!following);
  };

  const redirectToDetailPage = () => {
    router.push({
      pathname: '/detailUser',
      query: { seller: el.seller }, // Pass seller ID as a query parameter
    });
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
            src={el.background || images[`creatorbackground${i + 1}`]}
<<<<<<< HEAD
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
            src={el.user || images[`user${i + 1}`]}
          />
        </div>

        <div className={Style.FollowerTabCard_box_info}>
          <div className={Style.FollowerTabCard_box_info_name}>
            <h4>
              {el.seller.slice(0, 9)}
<<<<<<< HEAD
=======
              {""}{" "}
>>>>>>> collaborator-branch
              <span>
                <MdVerified />
              </span>
            </h4>
            <p>{el.total || 0} ETH</p>
          </div>

          <div className={Style.FollowerTabCard_box_info_following}>
<<<<<<< HEAD
            <a onClick={(e) => { e.stopPropagation(); followMe(); }}>
              {following ? 'Following' : 'Follow'}
              <span>
                <TiTick />
              </span>
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
