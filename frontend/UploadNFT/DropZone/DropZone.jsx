import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "./DropZone.module.css";
import images from "../../img";

const DropZone = ({
  title,
  heading,
  subHeading,
  itemName,
  website,
  description,
  royalties,
  fileSize,
  category,
  properties,
  image,
  price, // Add price prop
  onDrop,
}) => {
  const [fileUrl, setFileUrl] = useState(null);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFileUrl(URL.createObjectURL(file));

      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        onDrop(reader.result); // Pass the base64 string back to the parent component
      };
    },
    [onDrop]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*,video/*,audio/*,model/gltf-binary,model/gltf+json",
    maxSize: 100000000, // 100 MB
  });

  return (
    <div className={Style.DropZone}>
      <div className={Style.DropZone_box} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={Style.DropZone_box_input}>
          <p>{title}</p>
          <div className={Style.DropZone_box_input_img}>
            <img
              src={fileUrl || image}
              objectFit="contain"
              className={Style.DropZone_box_input_img_img}
            />
          </div>
          <p className={Style.choose}>Choose File</p>
          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div>

      {fileUrl && (
  <aside className={Style.DropZone_box_aside}>
    <div className={Style.preview_box}>
      <div className={Style.image_container}>
        <img src={fileUrl} alt="Preview Image" />
      </div>
      <div className={Style.details}>
        <h2>Rarible x Ethereum ERC-721</h2>
        <h3>{itemName || "Untitled"}</h3>
      </div>
      <div className={Style.info}>
        <div className={Style.info_section}>
          <p>Price</p>
          <p><strong>{price || "Not For Sale"}</strong></p>
        </div>
        <div className={Style.info_section}>
          <p>Highest bid</p>
          <p><strong>No bids yet</strong></p>
        </div>
      </div>
    </div>
  </aside>
)}

    </div>
  );
};

export default DropZone;
