import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import "./styles.css";

const ToggleButton = ({ Text, Options, onFilterTasks }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isVisibilitySelected, setIsVisibilitySelected] = useState(false);
  const [isStatusSelected, setIsStatusSelected] = useState(false);
  const message = "Selecione pelo menos um status e uma visibilidade.";
  const [errorMessage, setErrorMessage] = useState(message);
  
  const handleOptionToggle = (optionValue) => {
    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(selectedOptions.filter(option => option !== optionValue));
    } else {
      setSelectedOptions([...selectedOptions, optionValue]);
    }
  };

  // option1 = "Públicas", option2 = "Privadas", option3 = "Novas", option4 = "Concluídas"
  useEffect(() => {
    setIsVisibilitySelected(selectedOptions.includes("option1") || selectedOptions.includes("option2"));
    setIsStatusSelected(selectedOptions.includes("option3") || selectedOptions.includes("option4"));
  }, [selectedOptions]);

  const handleFilterTasks = async () => {
    if (isVisibilitySelected && isStatusSelected) {
      setErrorMessage("");
      onFilterTasks(selectedOptions);
    } else {
      setErrorMessage(message);
    }
  };

  useEffect(() => {
    handleFilterTasks();
  }, [isVisibilitySelected, isStatusSelected]);

  
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
        <label className="toggle-button-error">{errorMessage}</label>
      </div>
    </div>

  );
};

export default ToggleButton;
