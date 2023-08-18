import React, { useState } from "react";
import Modal from 'react-modal';
import "./styles.css";
import Input from "../Input";
import TextArea from "../TextArea";
import Button from "../Button";
import RadioButton from "../RadioButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import api from "../../services/api";

const Form = ({ actionName, isOpen, onClose, setTasks, buttonName, task }) => {
  const [formData, setFormData] = useState({
    id: task ? task.id : '',
    title: task ? task.title : '',
    description: task ? task.description : '',
    status: "not_finished",
    visibility: task ? task.visibility : '',
  });

  const handleVisibilityChange = (value) => {
    setFormData((prevData) => ({ ...prevData, visibility: value }));
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const newTask = async (event) => {
    event.preventDefault();
    // Enviar os dados p a API
    try {
      const response = await api.post("/tasks", {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        visibility: formData.visibility == "option1" ? "public_task" : "private_task",
      });
      if (response.status === 201) {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        onClose(); // fechar o modal
      } else {
        console.error("Erro ao adicionar a tarefa:", response.data);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const editTask = async (event) => {
    event.preventDefault();
    // Put p dar update nos dados
    try {
      const response = await api.put(`/tasks/${task.id}`, {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        visibility: formData.visibility == "option1" ? "public_task" : "private_task",
      });
      if (response.status === 200) {
        // Att o estado dessa tarefa
        setTasks((prevTasks) =>
          prevTasks.map((prevTask) =>
          prevTask.id === task.id ? response.data : prevTask
        ));
        onClose(); // Fecha o modal
      } else {
        console.error("Erro ao atualizar a tarefa:", response.data);
      }
    } catch (error) {
      console.log("Erro na requisição", error);
    }
  };

  const handleSubmit = async (event) => {
    console.log(formData);
    switch (actionName) {
      case "Nova tarefa":
        newTask(event);
        break;
      case "Editar tarefa":
        editTask(event);
        break;
      default:
        console.log("Error");
    }
  };

  const infoMode = actionName == "Detalhes da Tarefa";
  console.log("actionName", actionName);
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
            readOnly={infoMode}
            onChange={handleInputChange}
            placeholder="Digite o título da tarefa"          
          />
          <TextArea
            className="description-text"
            name="description"
            value={formData.description}
            readOnly={infoMode}
            onChange={handleInputChange}
            placeholder="Digite a descrição da tarefa"
          />
          <RadioButton 
            Options={["Pública", "Privada"]} 
            onOptionChange={handleVisibilityChange} 
            isDisabled={infoMode}
            task={task}
          />
          <label className="label-error"></label>
          {!infoMode && <Button Text={buttonName} onClick={handleSubmit} />}
        </div>
      </div>
    </Modal>
  );
};

export default Form;