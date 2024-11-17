import React from "react";
<<<<<<< HEAD
import Style from "./Button.module.css";

const Button = ({ btnName, handleClick, icon, classStyle, type = "button" }) => {
=======

//INTERNAL IMPORT
import Style from "./Button.module.css";

const Button = ({ btnName, handleClick, icon, classStyle }) => {
>>>>>>> collaborator-branch
  return (
    <div className={Style.box}>
      <button
        className={`${Style.button} ${classStyle}`}
<<<<<<< HEAD
        onClick={handleClick} 
        type={type}
=======
        onClick={() => handleClick()}
>>>>>>> collaborator-branch
      >
        {icon} {btnName}
      </button>
    </div>
  );
};

export default Button;
