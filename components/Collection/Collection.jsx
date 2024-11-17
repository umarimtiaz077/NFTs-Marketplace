<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from "react";
import { BsFillAlarmFill, BsFillCalendarDateFill, BsCalendar3 } from "react-icons/bs";
=======
import React, { useState, useEffect } from "react";
import {
  BsFillAlarmFill,
  BsFillCalendarDateFill,
  BsCalendar3,
} from "react-icons/bs";
import axios from "axios";
>>>>>>> nft-pinata-branch

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

const Collection = ({ slices }) => {
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);

<<<<<<< HEAD
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
=======
  // Fetch all collections on component mount
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/collection"
        );
        setCollections(response.data.collections);
        setFilteredCollections(response.data.collections); // Populate filteredCollections initially
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, []);
>>>>>>> nft-pinata-branch

  // Log collections to ensure correct data
  useEffect(() => {
    console.log("Fetched Collections from DB:", collections);
  }, [collections]);

  useEffect(() => {
    console.log("Filtered Collections:", filteredCollections);
  }, [filteredCollections]);

  // Handlers for toggling between filters
  const openPopular = () => {
    setPopular(true);
    setFollowing(false);
    setNews(false);
    setFilteredCollections(collections); // Modify this to apply specific filter logic if needed
  };

  const openFollower = () => {
    setPopular(false);
    setFollowing(true);
    setNews(false);
    setFilteredCollections(collections); // Modify this to apply specific filter logic if needed
  };

  const openNews = () => {
    setPopular(false);
    setFollowing(false);
    setNews(true);
    setFilteredCollections(collections); // Modify this to apply specific filter logic if needed
  };
<<<<<<< HEAD

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
=======
      <div className={Style.collection_box}>
        {slices && (
          <>
            {filteredCollections.slice(0, 3).map((collection, index) => (
              <DaysComponent key={collection._id} el={collection} i={index} />
            ))}
          </>
        )}
        {!slices && (
          <>
            {filteredCollections.map((collection, index) => (
              <DaysComponent key={collection._id} el={collection} i={index} />
            ))}
          </>
        )}
      </div>
>>>>>>> nft-pinata-branch
    </div>
  );
};

export default Collection;
