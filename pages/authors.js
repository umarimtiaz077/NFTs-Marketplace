// authors.js
import React, { useState, useEffect, useContext } from "react";
import Style from "../styles/author.module.css";
import { Title, Brand } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Authors = () => {
  const { fetchAllProfiles } = useContext(NFTMarketplaceContext);
  const [profiles, setProfiles] = useState([]); // State for user profiles

  useEffect(() => {
    const fetchProfiles = async () => {
      const data = await fetchAllProfiles();
      setProfiles(data); // Directly set profiles without re-mapping
    };
    fetchProfiles();
  }, [fetchAllProfiles]);

  return (
    <div className={Style.author}>
      <Title heading="Popular Creators" />
      <div className={Style.author_box}>
        {profiles.map((profile, i) => (
          <FollowerTabCard
            key={i}
            i={i}
            el={profile} // Pass profile data as el to FollowerTabCard
          />
        ))}
      </div>
      <Brand />
    </div>
  );
};

export default Authors;
