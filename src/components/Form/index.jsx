/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import "./styles.css";
import Input from "../Input";
import TextArea from "../TextArea";
import Button from "../Button";
import RadioButton from "../RadioButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const checkVisibility = (task) => {
  let vis;
  if (task) {
    switch (task.visibility) {
      case "public_task":
        vis = "option1";
        break;
      case "private_task":
        vis = "option2";
        break;
      default:
        vis = task.visibility;
    }
  } else {
    vis = "option1";
  }
  return vis;  
};

const Form = ({ actionName, isOpen, onClose, setTasks, buttonName, task }) => {

  const { signout } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    id: task ? task.id : '',
    title: task ? task.title : '',
    description: task ? task.description : '',
    status: "not_finished",
    visibility: checkVisibility(task),
  });

  useEffect(() => {
    setFormData({
      id: task ? task.id : '',
      title: task ? task.title : '',
      description: task ? task.description : '',
      status: "not_finished",
      visibility: checkVisibility(task),
    });
  }, [task]);

  const handleVisibilityChange = (value) => {
    setFormData((prevData) => ({ ...prevData, visibility: value }));
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const newTask = async (event) => {
    event.preventDefault();
    if (!formData.title || !formData.description) {
      setErrorMessage("Preencha todos os campos.");
      return;
    }
    console.log("Nova tarefa", formData);
    // Enviar os dados p a API
    try {
      const response = await api.post("/tasks", {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        visibility: formData.visibility == "option1" ? "public_task" : "private_task",
      });
      if (response.status === 201) {
        setTasks(response.data);
        onClose(); // fechar o modal
      } else {
        setErrorMessage("Erro ao adicionar a tarefa");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        signout();
        navigate("/home");
        return;
      }
      setErrorMessage("Erro na requisição");
    }
  };

  const editTask = async (event) => {
    event.preventDefault();
    if (!formData.title || !formData.description) {
      setErrorMessage("Preencha todos os campos.");
      return;
    }
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
        setTasks(response.data);
        onClose(); // Fecha o modal
      } else {
        setErrorMessage("Erro ao atualizar a tarefa");
      }
    } catch (error) {
      setErrorMessage("Erro na requisição");
    }
  };

  const handleSubmit = async (event) => {
    switch (actionName) {
      case "Nova tarefa":
        newTask(event);
        break;
      case "Editar tarefa":
        editTask(event);
        break;
      default:
        setErrorMessage("Não foi possível executar a ação");
    }
  };

  const infoMode = actionName == "Detalhes da Tarefa";
  
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
          <label className="label-error">{errorMessage}</label>
          {!infoMode && <Button Text={buttonName} onClick={handleSubmit} />}
        </div>
      </div>
    </Modal>
  );
};

export default Form;