import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";
import axios from "axios"; // For API calls

// INTERNAL IMPORT
import Style from "./Form.module.css";
import { Button } from "../../components/componentsindex.js";

const Form = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [file, setFile] = useState(null);

  const handleImageUpload = (e) => {
    setFile(e.target.files[0]); // Set the uploaded file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let profileImageUrl = null;

        // Step 1: Check if there's a file to upload
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("group", "profiles"); // Add the group parameter for profiles

            const uploadResponse = await axios.post("http://localhost:5000/api/upload/upload-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Capture the URL returned from Pinata
            profileImageUrl = uploadResponse.data.url;
        }

        // Step 2: Prepare profile data
        const profileData = {
            username,
            email,
            description,
            website,
            socialLinks: { facebook, twitter, instagram },
            walletAddress: walletAddress.toLowerCase(), // Convert to lowercase
            profileImage: profileImageUrl, // Set profile image URL if available
        };

        // Step 3: Update profile
        const response = await axios.put("http://localhost:5000/api/users/update-profile", profileData);

        console.log("Profile updated:", response.data);
    } catch (error) {
        console.error("Error updating profile:", error);
    }
};


  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form >
          <div className={Style.Form_box_input}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              placeholder="Your username"
              className={Style.Form_box_input_userName}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="email">Email</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input
                type="text"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              cols="30"
              rows="6"
              placeholder="Describe yourself"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="website">Website</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input
                type="text"
                placeholder="Website URL"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>

          {/* Social Links */}
          <div className={Style.Form_box_input_social}>
            <div className={Style.Form_box_input}>
              <label htmlFor="facebook">Facebook</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialFacebook />
                </div>
                <input
                  type="text"
                  placeholder="Facebook URL"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>
            </div>
            <div className={Style.Form_box_input}>
              <label htmlFor="Twitter">Twitter</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialTwitter />
                </div>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
            </div>
            <div className={Style.Form_box_input}>
              <label htmlFor="Instragram">Instagram</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialInstagram />
                </div>
                <input
                  type="text"
                  placeholder="Instagram URL"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Wallet Address */}
          <div className={Style.Form_box_input}>
            <label htmlFor="wallet">Wallet address</label>
            <div className={Style.Form_box_input_box}>
              <input
                type="text"
                placeholder="Wallet Address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineContentCopy />
              </div>
            </div>
          </div>

          {/* Profile Image Upload */}
          <div className={Style.Form_box_input}>
            <label htmlFor="profileImage">Profile Image</label>
            <input type="file" onChange={handleImageUpload} />
          </div>

          <div className={Style.Form_box_btn}>
            <Button btnName="Upload profile" handleClick={handleSubmit}   classStyle={Style.button} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
