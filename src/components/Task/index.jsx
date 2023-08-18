import React, { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

const Task = ({ task, onEdit, onDelete, openInfoModal }) => {
  const [isFinished, setIsFinished] = useState(task.status === "finished");
  const { user } = useAuth();

  const handleCheckboxChange = async () => {
    if (user.data.uid !== task.user.uid) {
      alert("Você não pode marcar a tarefa de outro usuário como concluída.");
      return;
    }
    try {
      const newStatus = isFinished ? "not_finished" : "finished";
      // Fazer a requisição de update p API
      const response = await api.put(`/tasks/${task.id}/status`, {status: newStatus});
      if (response.status) {
        setIsFinished(!isFinished);
      } else {
        console.error("Erro ao atualizar o status da tarefa.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="task-container"> 
      <label className="custom-checkbox-container">
        <input type="checkbox" className="checkbox" checked={isFinished}  onChange={handleCheckboxChange} />
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
  );
};

export default Task;
