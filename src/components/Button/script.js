import React from "react";
import "./Styles.css";

const Button1 = ({ text, whenClick, ...rest }) => {
  return (
    <button {...rest} onClick={whenClick} className="custom-btn btn-5">
      {text}
    </button>
  );
};

export default Button1;
