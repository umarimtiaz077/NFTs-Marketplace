// account.js (Parent Component)
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

// INTERNAL IMPORT
import Style from "../styles/account.module.css";
import images from "../img";
import Form from "../AccountPage/Form/Form";

const Account = () => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFileUrl(acceptedFiles[0]); // Set fileUrl as the first file in the accepted files
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>Profile settings</h1>
        <p>
          You can set preferred display name, create your profile URL, and manage
          other personal settings.
        </p>
      </div>

      <div className={Style.account_box}>
        <div className={Style.account_box_img} {...getRootProps()}>
          <input {...getInputProps()} />
          <Image
            src={fileUrl ? URL.createObjectURL(fileUrl) : images.user1}
            alt="account upload"
            width={150}
            height={150}
            className={Style.account_box_img_img}
          />
          <p className={Style.account_box_img_para}>Change Image</p>
        </div>
        <div className={Style.account_box_from}>
          <Form fileUrl={fileUrl} />
        </div>
      </div>
    </div>
  );
};

export default Account;
