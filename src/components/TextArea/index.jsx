import React from "react";
import "./styles.css";

const TextArea = ({ className, name, value, onChange, placeholder }) => {
  return (
    <textarea
      className={`textarea-style ${className}`}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
