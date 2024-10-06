import React, { useState, useRef } from "react";
import axios from "axios";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md/index.js";
import { FaPercent, FaDollarSign } from "react-icons/fa/index.js";
import { AiTwotonePropertySafety } from "react-icons/ai/index.js";
import { TiTick } from "react-icons/ti/index.js";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "./Upload.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import { Button, Collection } from "../components/componentsindex.js";
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
  const [showCreateCollection, setShowCreateCollection] = useState(false); // State to control Create Collection form visibility

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
      price, // Add price to form data
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/nfts/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("NFT created successfully:", response.data);
      setSuccessMessage("NFT created successfully!"); // Set success message
    } catch (error) {
      console.error("Error uploading NFT:", error);
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
      image: images.provider_1,
      category: "Meta Mask",
    },
    {
      image: images.chooseImg,
      category: "Create Collection",
    },
  ];

  const openCreateCollection = () => {
    setShowCreateCollection(true);
  };

  const closeCreateCollection = () => {
    setShowCreateCollection(false);
  };

  const handleClickOutside = (e) => {
    // Check if the click was outside the modal content
    if (e.target.classList.contains(Style.modalOverlay)) {
      closeCreateCollection();
    }
  };

  return (
    <>
      <div className={Style.upload}>
        <div ref={dropZoneRef}>
          <DropZone
            title="JPG, PNG, WEBM , MAX 100MB"
            heading="Drag & drop file"
            subHeading="or Browse media on your device"
            itemName={itemName}
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
            <label htmlFor="nft">Name</label>
            <input
              type="text"
              placeholder='e. g. "Redeemable T-Shirt with logo"'
              className={formStyle.Form_box_input_userName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          <div className={formStyle.Form_box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder='e.g. "After purchasing you will be able to get the real T-Shirt"'
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p>
              The description will be included on the item's detail page
              underneath its image. Markdown syntax is supported.
            </p>
          </div>

          <div className={formStyle.Form_box_input_social}>
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
                  onClick={() => {
                    setActive(i + 1);
                    setCategory(el.category);

                    // Show the Collection modal when "Create Collection" is clicked
                    if (el.category === "Create Collection") {
                      openCreateCollection();
                    }
                  }}
                >
                  <Image
                    src={el.image}
                    alt="background image"
                    width={100}
                    height={100}
                    className={Style.upload_box_slider_box_img_img}
                  />
                  <p>{el.category}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={Style.upload_box_btn}>
            <Button
              btnName="Create"
              handleClick={handleUpload}
              classStyle={Style.button}
            />
          </div>
          {successMessage && <p className={Style.success}>{successMessage}</p>}
        </div>
      </div>

      {/* Create Collection Modal */}
      {showCreateCollection && (
        <div className={Style.modalOverlay} onClick={handleClickOutside}>
          <div className={Style.createCollectionModal}>
            
            <div className={Style.createCollection}>
              <div className={Style.card}>
                <h2>Collection ERC-721</h2>
                <div className={Style.chooseImg}>
                  <img
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTAwcHgiIGhlaWdodD0iMTAwcHgiIHZpZXdCb3g9IjAgMCA4MCA4MCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIiBpZD0iODEyODI0MjY3ODQ0Ij4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDAsIDAsIDAsIDApIiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9InJnYigxNzksIDIyNCwgMjU4LCAxKSIgb2Zmc2V0PSI3NSUiPjwvc3RvcD4KICAgICA8c3RvcCBzdG9wLWNvbG9yPSJyZ2IoMTE1LCAyNTUsIDApIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0idXJsKCM4MTI4MjQyNjc4NDQpIiB4PSIwIiB5PSIwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiPjwvcmVjdD4KICA8L2c+Cjwvc3ZnPg=="
                    alt=""
                  />
                  <div className={Style.choose}>
                    <p>At least 300x300 pixels, max. size 5MB, GIF, JPEG or PNG</p>
                    <button>Choose File</button>
                  </div>
                </div>
                {/* Form Fields */}
                {/* Input --> 1 */}
                <div class={Style.container}>
                  <div class={Style.label}>
                    Display name <span class={Style.required}>(required)</span>
                  </div>
                  <div class={Style.input_container}>
                    <input
                      type="text"
                      class={Style.input_field}
                      placeholder="Enter collection name"
                    />
                  </div>
                  <div class={Style.note}>
                    Token name cannot be changed in future
                  </div>
                </div>
                {/* Input --> 2 */}
                <div class={Style.container}>
                  <div class={Style.label}>
                    Symbol <span class={Style.required}>(required)</span>
                  </div>
                  <div class={Style.input_container}>
                    <input
                      type="text"
                      class={Style.input_field}
                      placeholder="Enter token symbol"
                    />
                  </div>
                  <div class={Style.note}>
                    Token name cannot be changed in future
                  </div>
                </div>
                {/* Input --> 3 */}
                <div class={Style.container}>
                  <div class={Style.label}>
                    Description <span class={Style.required}>(required)</span>
                  </div>
                  <div class={Style.input_container}>
                    <input
                      type="text"
                      class={Style.input_field}
                      placeholder="Spread some words about your token collection"
                    />
                  </div>
                  <div class={Style.note}>
                    Token name cannot be changed in future
                  </div>
                </div>
                {/* Input --> 4 */}
                <div class={Style.container}>
                  <div class={Style.label}>
                    Short url <span class={Style.required}>(required)</span>
                  </div>
                  <div class={Style.input_container}>
                    <input
                      type="text"
                      class={Style.input_field}
                      placeholder="rarible.com/ Enter short url"
                    />
                  </div>
                  <div class={Style.note}>Will be used as public URL</div>
                </div>

                <button className={Style.create}>Create Collection</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadNFT;
