import React from "react";
import "./styles.css";

const Input = ({ className, name, type, placeholder, value, onChange }) => {
  return (
  <input className={`input-style ${className}`}
    name={name}
    value={value}
    onChange={onChange}
    type={type}
    placeholder={placeholder}
  />);
};

export default Input;