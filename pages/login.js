import React from "react";
import { TiSocialInstagram } from "react-icons/ti"; // Importing Instagram icon

// INTERNAL IMPORT
import Style from "../styles/login.module.css";
import LoginAndSignUp from "../loginAndSignUp/loginAndSignUp";

const Login = () => {
  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>
          <TiSocialInstagram className={Style.instagramIcon} /> {/* Add the icon here */}
          Login with Instagram
        </h1>
        <LoginAndSignUp />
        <p className={Style.login_box_para}>
          New user? <a href="#">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
