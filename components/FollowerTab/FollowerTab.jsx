import React, { useState, useEffect } from "react";
import {
  RiUserFollowFill,
  RiUserUnfollowFill,
  RiAwardLine,
} from "react-icons/ri";
<<<<<<< HEAD
import { useRouter } from "next/router"; // Import useRouter for navigation

// INTERNAL IMPORT
=======

//INTERNAL IMPORT
>>>>>>> collaborator-branch
import Style from "./FollowerTab.module.css";
import FollowerTabCard from "./FollowerTabCard/FollowerTabCard";
import images from "../../img";

const FollowerTab = ({ TopCreator }) => {
<<<<<<< HEAD
  const router = useRouter();

=======
  // const CardArray = [
  //   {
  //     background: images.creatorbackground1,
  //     user: images.user1,
  //   },
  //   {
  //     background: images.creatorbackground2,
  //     user: images.user2,
  //   },
  //   {
  //     background: images.creatorbackground3,
  //     user: images.user3,
  //   },
  //   {
  //     background: images.creatorbackground4,
  //     user: images.user4,
  //   },
  //   {
  //     background: images.creatorbackground5,
  //     user: images.user5,
  //   },
  //   {
  //     background: images.creatorbackground6,
  //     user: images.user6,
  //   },
  //   {
  //     background: images.creatorbackground7,
  //     user: images.user7,
  //   },
  //   {
  //     background: images.creatorbackground8,
  //     user: images.user8,
  //   },
  // ];
>>>>>>> collaborator-branch
  const FollowingArray = [
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "7200d8d8390d9993ujdc93900399djj277x",
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      seller: "7200d8d8390d9993ujdc93900399djj277x",
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "7200d8d8390d9993ujdc93900399djj277x",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "7200d8d8390d9993ujdc93900399djj277x",
    },
    {
      background: images.creatorbackground1,
      user: images.user1,
      seller: "7200d8d8390d9993ujdc93900399djj277x",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "7200d8d8390d9993ujdc93900399djj277x",
    },
  ];
<<<<<<< HEAD
  
=======
>>>>>>> collaborator-branch
  const NewsArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
      seller: "7200d8d8390d9993ujdc93900399djj277x",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "7200d8d8390d9993ujdc93900399djj277x",
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "7200d8d8390d9993ujdc93900399djj277x",
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      seller: "7200d8d8390d9993ujdc93900399djj277x",
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "7200d8d8390d9993ujdc93900399djj277x",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "7200d8d8390d9993ujdc93900399djj277x",
    },
    {
      background: images.creatorbackground7,
      user: images.user7,
      seller: "7200d8d8390d9993ujdc93900399djj277x",
    },
    {
      background: images.creatorbackground8,
      user: images.user8,
      seller: "7200d8d8390d9993ujdc93900399djj277x",
    },
  ];

  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);

  const openPopular = () => {
    if (!popular) {
      setPopular(true);
      setFollowing(false);
      setNews(false);
    }
  };
  const openFollower = () => {
    if (!following) {
      setPopular(false);
      setFollowing(true);
      setNews(false);
    }
  };
  const openNews = () => {
    if (!news) {
      setPopular(false);
      setFollowing(false);
      setNews(true);
    }
  };

<<<<<<< HEAD
  // Redirect to the detailed NFT page when clicking on a user
  const redirectToDetailPage = (seller) => {
    router.push(`/author?seller=${seller}`); // Navigate to author.js with seller ID in query
  };

=======
>>>>>>> collaborator-branch
  return (
    <div className={Style.followerTab}>
      <div className={Style.followerTab_title}>
        <h2> Top Creators List..</h2>
        <div className={Style.followerTab_tabs}>
          <div className={Style.followerTab_tabs_btn}>
            <button onClick={() => openPopular()}>
              <RiUserFollowFill /> Popular
            </button>
            <button onClick={() => openFollower()}>
              <RiUserFollowFill /> Following
            </button>
            <button onClick={() => openNews()}>
              <RiAwardLine /> NoteWorthy
            </button>
          </div>
        </div>
      </div>

      {popular && (
        <div className={Style.followerTab_box}>
          {TopCreator.map((el, i) => (
<<<<<<< HEAD
            <div key={i + 1} onClick={() => redirectToDetailPage(el.seller)}>
              <FollowerTabCard i={i} el={el} />
            </div>
=======
            <FollowerTabCard key={i + 1} i={i} el={el} />
>>>>>>> collaborator-branch
          ))}
        </div>
      )}

      {following && (
        <div className={Style.followerTab_box}>
          {FollowingArray.map((el, i) => (
<<<<<<< HEAD
            <div key={i + 1} onClick={() => redirectToDetailPage(el.seller)}>
              <FollowerTabCard i={i} el={el} />
            </div>
=======
            <FollowerTabCard key={i + 1} i={i} el={el} />
>>>>>>> collaborator-branch
          ))}
        </div>
      )}

      {news && (
        <div className={Style.followerTab_box}>
          {NewsArray.map((el, i) => (
<<<<<<< HEAD
            <div key={i + 1} onClick={() => redirectToDetailPage(el.seller)}>
              <FollowerTabCard i={i} el={el} />
            </div>
=======
            <FollowerTabCard key={i + 1} i={i} el={el} />
>>>>>>> collaborator-branch
          ))}
        </div>
      )}

      <div className={Style.followerTab_member}>
        <div className={Style.followerTab_member_box}>
<<<<<<< HEAD
          <a href="authors">Show me more</a>
=======
          <a href="#">Show me more</a>
          <a href="#">Become, author</a>
>>>>>>> collaborator-branch
        </div>
      </div>
    </div>
  );
};

export default FollowerTab;
