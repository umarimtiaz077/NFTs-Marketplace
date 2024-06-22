import React, { useState, useEffect, useCallback } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
import { TiSocialFacebook, TiSocialTwitter, TiSocialInstagram } from "react-icons/ti";
import { useDropzone } from "react-dropzone";
import { useRouter } from 'next/router';
import Style from "./Form.module.css";
import { Button } from "../../components/componentsindex.js";

const Form = ({ profileImage }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    description: '',
    website: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: ''
    },
    walletAddress: '',
    profileImage: profileImage // Initialize with the passed prop
  });
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const wallet = router.query.wallet || localStorage.getItem('walletAddress');
    if (wallet) {
      setFormData(prevState => ({ ...prevState, walletAddress: wallet }));
      fetchUserProfile(wallet);
    }
  }, [router.query.wallet]);

  useEffect(() => {
    setFormData(prevState => ({ ...prevState, profileImage }));
  }, [profileImage]);

  const fetchUserProfile = async (walletAddress) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${walletAddress}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          username: data.username || '',
          email: data.email || '',
          description: data.description || '',
          website: data.website || '',
          socialLinks: data.socialLinks || {
            facebook: '',
            twitter: '',
            instagram: ''
          },
          walletAddress: data.walletAddress || walletAddress,
          profileImage: data.profileImage || profileImage
        });
        setIsEdit(true); // Indicates that we're editing an existing profile
      } else {
        console.error('User profile not found:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('socialLinks.')) {
      const key = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        socialLinks: {
          ...prevState.socialLinks,
          [key]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleImageUpload = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData((prevState) => ({ ...prevState, profileImage: reader.result }));
    };
  };

  const onDrop = useCallback((acceptedFiles) => {
    handleImageUpload(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*', maxSize: 5000000 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);
  
    try {
      const method = isEdit ? 'PUT' : 'POST';
      const endpoint = isEdit ? `http://localhost:5000/api/users/${formData.walletAddress}` : 'http://localhost:5000/api/users';
  
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        // Log error response
        const errorData = await response.json();
        console.error('Failed to save profile:', errorData);
        setError(`Failed to upload profile. Reason: ${errorData.error}`);
        alert(`Failed to upload profile. Reason: ${errorData.error}`);
        return;
      }
  
      const responseData = await response.json();
      console.log('User profile saved successfully:', responseData);
      localStorage.setItem('formFilled', true);
      alert("Profile uploaded successfully!");
      // Redirect to the home page and ensure navbar updates accordingly
      window.location.href = '/';
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred while uploading your profile. Please try again.');
      alert('An error occurred while uploading your profile. Please try again.');
    }
  };
  

  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form onSubmit={handleSubmit}>
          <div className={Style.Form_box_input}>
            <label htmlFor="Display Name">Display Name</label>
            <input
              type="text"
              name="username"
              placeholder="Display Name"
              className={Style.Form_box_input_userName}
              value={formData.username}
              onChange={handleChange}
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
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              cols="30"
              rows="6"
              placeholder="Something about yourself in a few words"
              value={formData.description}
              onChange={handleChange}
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
                name="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={Style.Form_box_input_social}>
            <div className={Style.Form_box_input}>
              <label htmlFor="facebook">Facebook</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialFacebook />
                </div>
                <input
                  type="text"
                  name="socialLinks.facebook"
                  placeholder="Facebook URL"
                  value={formData.socialLinks.facebook}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={Style.Form_box_input}>
              <label htmlFor="twitter">Twitter</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialTwitter />
                </div>
                <input
                  type="text"
                  name="socialLinks.twitter"
                  placeholder="Twitter URL"
                  value={formData.socialLinks.twitter}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={Style.Form_box_input}>
              <label htmlFor="instagram">Instagram</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialInstagram />
                </div>
                <input
                  type="text"
                  name="socialLinks.instagram"
                  placeholder="Instagram URL"
                  value={formData.socialLinks.instagram}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="walletAddress">Wallet address</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input
                type="text"
                name="walletAddress"
                value={formData.walletAddress}
                readOnly
              />
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineContentCopy onClick={() => navigator.clipboard.writeText(formData.walletAddress)} />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="profileImage">Profile Image</label>
            <div {...getRootProps()} className={Style.Form_box_input_box}>
              <input {...getInputProps()} />
              <p>Drag & drop or click to select profile image</p>
            </div>
          </div>

          <div className={Style.Form_box_btn}>
            <Button btnName={isEdit ? "Update Profile" : "Upload Profile"} type="submit" classStyle={Style.button} />
          </div>
        </form>
        {error && <p className={Style.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Form;
