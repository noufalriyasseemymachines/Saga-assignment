import React from "react";
import "./Input.css";

const Input = ({ label, placeholder, value, onChange, name, type,className }) => {
  return (
    <div className="input-full">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={className}
      ></input>
    </div>
  );
};

export default Input;
