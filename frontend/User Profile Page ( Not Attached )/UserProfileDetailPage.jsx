import React, { useState, useEffect } from "react";

// INTERNAL IMPORT
import Style from "./UserProfileDetailPage.module.css";

const UserProfileDetailPage = () => {

  return (
    <>
      <div className={Style.container}>
        <div className={Style.header}></div>
        <div className={Style.profileHead}>
          <div className={Style.profile}>
            <img
              alt="Profile picture"
              height="100"
              src="https://storage.googleapis.com/a1aa/image/PXzvOJEPpwLxPh21WRJe7t2ysQUZg0ZdQYg8BOTCVULNzeiTA.jpg"
              width="100"
            />
            <div className={Style.profile_info}>
              <h1>0xbea2e40be...1b43</h1>
              <span className={Style.verified}>
                <i className="fas fa-check-circle"></i>
                Get verified
              </span>
            </div>
            <div className={Style.profile_actions}>
              <button>Edit profile</button>
              <button>Sell</button>
              <button>
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </div>
          </div>
          <div className={Style.followers_following}>
            <div className={Style.info}>
              <span>Followers</span>
              <span>0</span>
            </div>
            <div className={Style.info}>
              <span>Following</span>
              <span>0</span>
            </div>
            <div className={Style.address}>
              <span>Address</span>
              <span>
                0xbea2e...1b43 <i className="fas fa-chevron-down"></i>
              </span>
            </div>
          </div>
        </div>
        <div className={Style.tabs}>
          <a className={Style.active} href="#">
            Owned
          </a>
          <a href="#">On sale</a>
          <a href="#">Collections</a>
          <a href="#">Created</a>
          <a href="#">Activity</a>
          <a href="#">More</a>
        </div>
        <div className={Style.filters}>
          <button>Filters</button>
          <div className={Style.view_options}>
            <select className={Style.selectBtn}>
              <option>Recently received</option>
            </select>
            <i className="fas fa-th-large"></i>
            <i className="fas fa-th-list"></i>
          </div>
        </div>
        <div className={Style.content}>
          <div className={Style.item}>
            <div className={Style.text}>
              <h2>Nothing found</h2>
              <p>We couldn't find anything with this criteria</p>
            </div>
          </div>
          <div className={Style.item}></div>
          <div className={Style.item}></div>
          <div className={Style.item}></div>
          <div className={Style.item}></div>
          <div className={Style.item}></div>
          <div className={Style.item}></div>
          <div className={Style.item}></div>
        </div>
      </div>
    </>
  );
};

export default UserProfileDetailPage;
