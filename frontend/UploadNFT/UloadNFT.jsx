import React, { useState, useRef } from "react";
import axios from 'axios';
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaPercent, FaDollarSign } from "react-icons/fa";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "./Upload.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import { Button } from "../components/componentsindex.js";
import { DropZone } from "../UploadNFT/uploadNFTIndex.js";

const UploadNFT = () => {
  const [active, setActive] = useState(0);
  const [itemName, setItemName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [category, setCategory] = useState(0);
  const [properties, setProperties] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(""); // New state for price
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const dropZoneRef = useRef(null); // Reference for DropZone

  const handleUpload = async () => {
    const formData = {
      itemName,
      website,
      description,
      royalties,
      fileSize,
      category,
      properties,
      image, // Pass the base64 image data
      userAddress: "0x1234...", // Replace with the actual user address
      price // Add price to form data
    };

    try {
      const response = await axios.post('http://localhost:5000/api/nfts/create', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('NFT created successfully:', response.data);
      setSuccessMessage('NFT created successfully!'); // Set success message
    } catch (error) {
      console.error('Error uploading NFT:', error);
    }
  };

  const handlePreview = () => {
    dropZoneRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileChange = (file) => {
    setImage(file);
  };

  const categoryArry = [
    {
      image: images.nft_image_1,
      category: "Sports",
    },
    {
      image: images.nft_image_2,
      category: "Arts",
    },
    {
      image: images.nft_image_3,
      category: "Music",
    },
    {
      image: images.nft_image_1,
      category: "Digital",
    },
    {
      image: images.nft_image_2,
      category: "Time",
    },
    {
      image: images.nft_image_3,
      category: "Photography",
    },
  ];

  return (
    <div className={Style.upload}>
      <div ref={dropZoneRef}>
        <DropZone
          title="JPG, PNG, WEBM , MAX 100MB"
          heading="Drag & drop file"
          subHeading="or Browse media on your device"
          itemName={itemName}
          website={website}
          description={description}
          royalties={royalties}
          fileSize={fileSize}
          category={category}
          properties={properties}
          image={images.upload}
          onDrop={handleFileChange}
          price={price} // Pass the price to DropZone
        />
      </div>

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Item Name</label>
          <input
            type="text"
            placeholder="shoaib bhai"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="website">Website</label>
          <div className={formStyle.Form_box_input_box}>
            <div className={formStyle.Form_box_input_box_icon}>
              <MdOutlineHttp />
            </div>

            <input
              type="text"
              placeholder="website"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <p className={Style.upload_box_input_para}>
            Ciscrypt will include a link to this URL on this item's detail page,
            so that users can click to learn more about it. You are welcome to
            link to your own webpage with more details.
          </p>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="something about yourself in few words"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>
            The description will be included on the item's detail page
            underneath its image. Markdown syntax is supported.
          </p>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Choose collection</label>
          <p className={Style.upload_box_input_para}>
            This is the collection where your item will appear.
          </p>

          <div className={Style.upload_box_slider_div}>
            {categoryArry.map((el, i) => (
              <div
                className={`${Style.upload_box_slider} ${
                  active == i + 1 ? Style.active : ""
                }`}
                key={i + 1}
                onClick={() => (
                  setActive(i + 1), setCategory(el.category)
                )}
              >
                <div className={Style.upload_box_slider_box}>
                  <div className={Style.upload_box_slider_box_img}>
                    <Image
                      src={el.image}
                      alt="background image"
                      width={70}
                      height={70}
                      className={Style.upload_box_slider_box_img_img}
                    />
                  </div>
                  <div className={Style.upload_box_slider_box_img_icon}>
                    <TiTick />
                  </div>
                </div>
                <p>{el.category}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={formStyle.Form_box_input_social}>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Royalties">Royalties</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <FaPercent />
              </div>
              <input
                type="text"
                placeholder="20%"
                onChange={(e) => setRoyalties(e.target.value)}
              />
            </div>
          </div>

          <div className={formStyle.Form_box_input}>
            <label htmlFor="size">File Size</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <MdOutlineAttachFile />
              </div>

              <input
                type="text"
                placeholder="100MB"
                onChange={(e) => setFileSize(e.target.value)}
              />
            </div>
          </div>

          <div className={formStyle.Form_box_input}>
            <label htmlFor="Properties">Properties</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type="text"
                placeholder="Properties"
                onChange={(e) => setProperties(e.target.value)}
              />
            </div>
          </div>

          <div className={formStyle.Form_box_input}>
            <label htmlFor="Price">Price</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <FaDollarSign />
              </div>
              <input
                type="text"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={Style.upload_box_btn}>
          <Button
            btnName="Preview"
            handleClick={handlePreview}
            classStyle={Style.button}
          />
          <Button
            btnName="Upload"
            handleClick={handleUpload}
            classStyle={Style.button}
          />
        </div>
        {successMessage && <p className={Style.success}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default UploadNFT;
