import React from "react";
import "../Button/Button.css";

const Button = ({ value, className, type, onClick }) => {
  return (
    <button type={type} className={`button ${className}`} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
