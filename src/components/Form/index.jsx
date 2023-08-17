import React, { useState } from "react";
import Modal from 'react-modal';
import "./styles.css";
import Input from "../Input";
import TextArea from "../TextArea";
import Button from "../Button";
import RadioButton from "../RadioButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Form = ({ actionName, isOpen, onClose, task}) => {
  const [formData, setFormData] = useState({
    id: task ? task.id : '',
    title: task ? task.title : '',
    description: task ? task.description : '',
    status: task ? task.status : '',
    visibility: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className="container">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <label className="label">{actionName}</label>
        <div className="content">
          <Input 
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Digite o título da tarefa"          
          />
          <TextArea
            className="description-text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Digite a descrição da tarefa"
          />
          <RadioButton Options={["Pública", "Privada"]} />
          <label className="label-error"></label>
          <Button Text="Criar" />
        </div>
      </div>
    </Modal>
  );
};

export default Form;