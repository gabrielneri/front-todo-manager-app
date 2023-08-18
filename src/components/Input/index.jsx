import React from "react";
import "./styles.css";

const Input = ({ className, name, type, placeholder, value, onChange, readOnly }) => {
  return (
  <input className={`input-style ${className}`}
    name={name}
    value={value}
    readOnly={readOnly}
    onChange={onChange}
    type={type}
    placeholder={placeholder}
  />);
};

export default Input;