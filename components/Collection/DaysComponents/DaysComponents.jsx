import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import Link from "next/link";

// INTERNAL IMPORT
import Style from "./DaysComponents.module.css";
import images from "../../../img";

const DaysComponents = ({ el, i }) => {
  // Use el.id for the dynamic routing
  const collectionId = el.id; // Ensure that el.id is a valid identifier

  return (
    <Link href={`/collection`} passHref>
      <div className={Style.daysComponent}> {/* Ensure everything is wrapped in one div */}
        <div className={Style.daysComponent_box}>
          <div className={Style.daysComponent_box_img}>
            <Image
              src={el.background}
              className={Style.daysComponent_box_img_img}
              alt="profile background"
              width={500}
              height={300}
              objectFit="cover"
            />
          </div>

          <div className={Style.daysComponent_box_profile}>
            
            
            
          </div>

          <div className={Style.daysComponent_box_title}>
            <h2>Amazing Collection</h2>
            <div className={Style.daysComponent_box_title_info}>
              <div className={Style.daysComponent_box_title_info_profile}>
                <Image
                  src={el.user}
                  alt="profile"
                  width={30}
                  height={30}
                  objectFit="cover"
                  className={Style.daysComponent_box_title_info_profile_img}
                />

                <p>
                  Creator
                  <span>
                    Shoaib Bhai
                    
                  </span>
                </p>
              </div>

            
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DaysComponents;
