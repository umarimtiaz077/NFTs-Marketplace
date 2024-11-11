import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// INTERNAL IMPORTS
import Style from "../styles/author.module.css";
import { Banner } from "../collectionPage/collectionIndex";
import { Brand, Title } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import { AuthorProfileCard, AuthorTaps, AuthorNFTCardBox } from "../authorPage/componentIndex";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const DetailUser = () => {
  const router = useRouter();
  const { seller } = router.query; // Get seller ID from the route query

  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTMarketplaceContext);
  const [userData, setUserData] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [activeTab, setActiveTab] = useState("Listed NFTs");

  useEffect(() => {
    if (seller) {
      // Fetch the selected user's profile data
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/profile/${seller}`);
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [seller]);

  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchItemsListed").then(setNfts);
    fetchMyNFTsOrListedNFTs("fetchMyNFTs").then(setMyNFTs);
  }, [fetchMyNFTsOrListedNFTs]);

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${seller}/followers`);
      setFollowers(response.data);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  const fetchFollowing = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${seller}/following`);
      setFollowers(response.data); // Assume that "Following" displays in the same format as "Followers"
    } catch (error) {
      console.error("Error fetching following:", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Followers") fetchFollowers();
    else if (tab === "Following") fetchFollowing();
  };

  return (
    <div className={Style.author}>
      <Banner bannerImage={userData?.background || "/default-background.jpg"} />

      {userData && (
        <AuthorProfileCard
          currentAccount={userData.walletAddress}
          profileImage={userData.profileImage}
          username={userData.username}
          description={userData.description}
          socialLinks={userData.socialLinks}
        />
      )}

      <AuthorTaps activeTab={activeTab} onTabClick={handleTabClick} />

      {["Listed NFTs", "Own NFT", "Liked"].includes(activeTab) && (
        <AuthorNFTCardBox
          collectiables={activeTab === "Listed NFTs"}
          created={activeTab === "Own NFT"}
          like={activeTab === "Liked"}
          follower={false}
          following={false}
          nfts={nfts}
          myNFTS={myNFTs}
        />
      )}

      <Title heading="Popular Creators" paragraph="Click on music icon and enjoy NFT music or audio" />

      <div className={Style.author_box}>
        {followers.map((follower, i) => (
          <FollowerTabCard key={follower._id || i} i={i} el={follower} />
        ))}
      </div>

      <Brand />
    </div>
  );
};

export default DetailUser;
