import React, { useState } from 'react';
import "./styles.css";

const RadioButton = ({ Options }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="radio-button-options">
      {Options.map((option, index) => (
        <label key={index} className="radio-label">
          <input
            type="radio"
            value={`option${index + 1}`}
            checked={selectedOption === `option${index + 1}`}
            onChange={handleOptionChange}
          />
          <span className="option-text">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
