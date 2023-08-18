import React from "react";
import "./styles.css";

const TextArea = ({ className, name, value, onChange, placeholder, readOnly  }) => {
  return (
    <textarea
      className={`textarea-style ${className}`}
      name={name}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
