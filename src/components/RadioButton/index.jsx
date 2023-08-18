import React, { useState } from 'react';
import "./styles.css";

const RadioButton = ({ Options, onOptionChange, task, isDisabled }) => {
  const preOption = task ? (task.visibility == 'public_task' ? "option1" : "option2") : "option1";
  const [selectedOption, setSelectedOption] = useState(preOption);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onOptionChange(selectedValue);
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
            disabled={isDisabled}
          />
          <span className="option-text">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
