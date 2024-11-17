<<<<<<< HEAD
import React, { useState } from "react";
import { BsFillAlarmFill, BsFillCalendarDateFill, BsCalendar3 } from "react-icons/bs";

// INTERNAL IMPORT
=======
import React, { useState, useEffect } from "react";
import {
  BsFillAlarmFill,
  BsFillCalendarDateFill,
  BsCalendar3,
} from "react-icons/bs";

//INTERNAL IMPORT
>>>>>>> collaborator-branch
import Style from "./Collection.module.css";
import DaysComponent from "./DaysComponents/DaysComponents";
import images from "../../img";

const Collection = () => {
  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);

<<<<<<< HEAD
  // Original array of collections
  const CardArray = [
    {
      id: 1, // Ensure you have unique IDs
=======
  const CardArray = [
    {
>>>>>>> collaborator-branch
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
<<<<<<< HEAD
      id: 2,
=======
>>>>>>> collaborator-branch
      background: images.creatorbackground2,
      user: images.user2,
    },
    {
<<<<<<< HEAD
      id: 3,
=======
>>>>>>> collaborator-branch
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
<<<<<<< HEAD
      id: 4,
=======
>>>>>>> collaborator-branch
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
<<<<<<< HEAD
      id: 5,
=======
>>>>>>> collaborator-branch
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
<<<<<<< HEAD
      id: 6,
=======
>>>>>>> collaborator-branch
      background: images.creatorbackground6,
      user: images.user6,
    },
    {
<<<<<<< HEAD
      id: 7,
=======
>>>>>>> collaborator-branch
      background: images.creatorbackground7,
      user: images.user7,
    },
    {
<<<<<<< HEAD
      id: 8,
=======
      background: images.creatorbackground8,
      user: images.user8,
    },
  ];
  const newsArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
    },
  ];
  const followingArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
    {
      background: images.creatorbackground7,
      user: images.user7,
    },
    {
>>>>>>> collaborator-branch
      background: images.creatorbackground8,
      user: images.user8,
    },
  ];

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

  // Select only the first collection for display
  const selectedCollection = CardArray[0]; // Change index as needed to select a different collection

  return (
    <div className={Style.collection}>
      <div className={Style.collection_title}>
        <h2>Discover Collections</h2>
        <div className={Style.collection_collections}>
          <div className={Style.collection_collections_btn}>
            <button onClick={openPopular}>
              <BsFillAlarmFill /> 24 hours
            </button>
            <button onClick={openFollower}>
              <BsCalendar3 /> 7 days
            </button>
            <button onClick={openNews}>
=======
  return (
    <div className={Style.collection}>
      <div className={Style.collection_title}>
        <h2>Top List Creators</h2>
        <div className={Style.collection_collections}>
          <div className={Style.collection_collections_btn}>
            <button onClick={() => openPopular()}>
              <BsFillAlarmFill /> 24 hours
            </button>
            <button onClick={() => openFollower()}>
              <BsCalendar3 /> 7 days
            </button>
            <button onClick={() => openNews()}>
>>>>>>> collaborator-branch
              <BsFillCalendarDateFill /> 30 days
            </button>
          </div>
        </div>
      </div>
<<<<<<< HEAD

      {popular && (
        <div className={Style.collection_box}>
          {/* Render only the selected collection */}
          <DaysComponent key={selectedCollection.id} i={0} el={selectedCollection} />
=======
      {popular && (
        <div className={Style.collection_box}>
          {CardArray.map((el, i) => (
            <DaysComponent key={i + 1} i={i} el={el} />
          ))}
>>>>>>> collaborator-branch
        </div>
      )}

      {following && (
        <div className={Style.collection_box}>
<<<<<<< HEAD
          {/* Render only the selected collection (or adjust based on your logic) */}
          <DaysComponent key={selectedCollection.id} i={0} el={selectedCollection} />
=======
          {followingArray.map((el, i) => (
            <DaysComponent key={i + 1} i={i} el={el} />
          ))}
>>>>>>> collaborator-branch
        </div>
      )}

      {news && (
        <div className={Style.collection_box}>
<<<<<<< HEAD
          {/* Render only the selected collection (or adjust based on your logic) */}
          <DaysComponent key={selectedCollection.id} i={0} el={selectedCollection} />
        </div>
      )}
    
=======
          {newsArray.map((el, i) => (
            <DaysComponent key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}
>>>>>>> collaborator-branch
    </div>
  );
};

export default Collection;
