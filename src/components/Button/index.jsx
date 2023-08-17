import React from "react";
import "./styles.css";

const Button = ({ Text, onClick, Type = "button" }) => {
  return (
  <button className="button-style" type={Type} onClick={onClick}>
    {Text}
  </button>);
};

export default Button;