import { useState, useEffect } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Task = ({ task, onEdit, onDelete, openInfoModal, errorMessageFromTodo, selectedOptions, editTaskList }) => {
  const [isFinished, setIsFinished] = useState(task.status === "finished");
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  
  useEffect(() => {
    if (errorMessageFromTodo) {
      showErrorMessage(errorMessageFromTodo);
    }
  }, [errorMessageFromTodo]);

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 1500); 
  };
  
  const handleCheckboxChange = async () => {
    if (user.data.uid !== task.user.uid) {
      showErrorMessage("Você não pode marcar a tarefa de outro usuário como concluída.");
      return;
    }
    try {
      const newStatus = isFinished ? "not_finished" : "finished";
      console.log(newStatus, isFinished);
      const response = await api.put(`/tasks/${task.id}/status`, { status: newStatus });
      if (response.status) {
        setIsFinished(!isFinished);
        task.status = task.status === "not_finished" ? "finished" : "not_finished";
        editTaskList(task);
      } else {
        console.error("Erro ao atualizar o status da tarefa.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        signout();
        navigate("/home");
        return;
      }
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <>
    <div className="error-label-container">
      <label className="label-error">{errorMessage}</label>
    </div>
    <div className="task-container"> 
      <label className="custom-checkbox-container">
        <input 
          type="checkbox" 
          className="checkbox" 
          checked={isFinished}          
          onChange={handleCheckboxChange}
        />
        <div className="custom-checkbox"></div>
      </label>
      <div className="task-label" onClick={() => openInfoModal(task)}>{task.title}</div>
      <div className="icons-task">
        {user.data.uid === task.user.uid &&  <FontAwesomeIcon icon={faCircle} className="circle-user" title="Minha tarefa" />}
        <FontAwesomeIcon
          icon={faCircle}
          className={`circle-visibility ${task.visibility === "public_task" ? "blue" : "gray"}`}
          title={task.visibility === "public_task" ? "Pública" : "Privada"}
        />
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => onEdit(task)}/>
        <FontAwesomeIcon icon={faTrash} onClick={() => onDelete(task)}/>
      </div>
    </div>
    </>

  );
};

export default Task;
