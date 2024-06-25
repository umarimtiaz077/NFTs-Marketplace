import React, { useState, useEffect } from "react";
import axios from 'axios';

// INTERNAL IMPORT
import Style from "../styles/author.module.css";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Brand, Title } from "../components/componentsindex";
import images from "../img";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";

const author = () => {
  const followerArray = [
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
  ];

  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);
  const [createdNFTs, setCreatedNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreatedNFTs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/nfts/user/0x1234...'); // Replace with actual user address
        setCreatedNFTs(response.data);
      } catch (error) {
        console.error('Error fetching created NFTs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatedNFTs();
  }, []);

  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground2} />
      <AuthorProfileCard />
      <AuthorTaps
        setCollectiables={setCollectiables}
        setCreated={setCreated}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}
      />

      {!loading ? (
        <AuthorNFTCardBox
          collectiables={collectiables}
          created={created}
          like={like}
          follower={follower}
          following={following}
          createdNFTs={createdNFTs} // Pass the created NFTs to the component
        />
      ) : (
        <p>Loading...</p> // Show loading text or spinner while fetching data
      )}
      
    </div>
  );
};

export default author;
