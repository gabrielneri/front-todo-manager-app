import React, { useState } from 'react';
import S from "./styles.css";

const ToggleButton = ({ Text, Options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionToggle = (optionValue) => {
    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(selectedOptions.filter(option => option !== optionValue));
    } else {
      setSelectedOptions([...selectedOptions, optionValue]);
    }
  };
  
  return (
    <div className="options-toggle">
      <div className="option-label">
        <p>{Text}</p>
      </div>
      <div className="switch-options">
        {Options.map((option, index) => (
          <label key={index} className={`switch-label ${selectedOptions.includes(`option${index + 1}`) ? 'active' : ''}`}>
            <input
              type="checkbox"
              value={`option${index + 1}`}
              checked={selectedOptions.includes(`option${index + 1}`)}
              onChange={() => handleOptionToggle(`option${index + 1}`)}
            />
            <span className={`slider ${selectedOptions.includes(`option${index + 1}`) ? 'active' : ''}`}></span>
            {option}
          </label>
        ))}
      </div>
    </div>

  );
};

export default ToggleButton;
