import React from "react";
import "./Input.css";

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  type,
  className,
  min,
  step
}) => {
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
        min={min}
        step={step}
      ></input>
    </div>
  );
};

export default Input;
