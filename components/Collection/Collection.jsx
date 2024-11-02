import React, { useState } from "react";
import { BsFillAlarmFill, BsFillCalendarDateFill, BsCalendar3 } from "react-icons/bs";

// INTERNAL IMPORT
import Style from "./Collection.module.css";
import DaysComponent from "./DaysComponents/DaysComponents";
import images from "../../img";

const Collection = () => {
  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);

  // Original array of collections
  const CardArray = [
    {
      id: 1, // Ensure you have unique IDs
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      id: 2,
      background: images.creatorbackground2,
      user: images.user2,
    },
    {
      id: 3,
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      id: 4,
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      id: 5,
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      id: 6,
      background: images.creatorbackground6,
      user: images.user6,
    },
    {
      id: 7,
      background: images.creatorbackground7,
      user: images.user7,
    },
    {
      id: 8,
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
              <BsFillCalendarDateFill /> 30 days
            </button>
          </div>
        </div>
      </div>

      {popular && (
        <div className={Style.collection_box}>
          {/* Render only the selected collection */}
          <DaysComponent key={selectedCollection.id} i={0} el={selectedCollection} />
        </div>
      )}

      {following && (
        <div className={Style.collection_box}>
          {/* Render only the selected collection (or adjust based on your logic) */}
          <DaysComponent key={selectedCollection.id} i={0} el={selectedCollection} />
        </div>
      )}

      {news && (
        <div className={Style.collection_box}>
          {/* Render only the selected collection (or adjust based on your logic) */}
          <DaysComponent key={selectedCollection.id} i={0} el={selectedCollection} />
        </div>
      )}
    
    </div>
  );
};

export default Collection;
