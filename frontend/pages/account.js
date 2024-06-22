import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

//INTERNAL IMPORT
import Style from "../styles/account.module.css";
import images from "../img";
import Form from "../AccountPage/Form/Form";

const Account = () => {
  const [fileUrl, setFileUrl] = useState(images.user1); // Default image or previously saved image URL

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    if (file) {
      // You can create a URL for preview purposes
      const previewUrl = URL.createObjectURL(file);
      setFileUrl(previewUrl);

      // You can add logic here to upload the file to your server and get the new URL
      // For example, upload to your backend or a cloud storage service and get the URL
      // const newFileUrl = await uploadFile(file);
      // setFileUrl(newFileUrl);

      // Simulate the upload for demonstration purposes
      setTimeout(() => {
        // Simulating a URL returned after uploading
        const simulatedUploadUrl = previewUrl; // Use the preview URL for now
        setFileUrl(simulatedUploadUrl);
        // Cleanup the preview URL to free memory
        URL.revokeObjectURL(previewUrl);
      }, 1000);
    }
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
          You can set preferred display name, create your profile URL and manage
          other personal settings.
        </p>
      </div>

      <div className={Style.account_box}>
        <div className={Style.account_box_img} {...getRootProps()}>
          <input {...getInputProps()} />
          <Image
            src={fileUrl}
            alt="account upload"
            width={150}
            height={150}
            className={Style.account_box_img_img}
          />
          <p className={Style.account_box_img_para}>Change</p>
        </div>
        <div className={Style.account_box_form}>
          <Form profileImage={fileUrl} /> {/* Pass the profile image URL to the Form component if needed */}
        </div>
      </div>
    </div>
  );
};

export default Account;
