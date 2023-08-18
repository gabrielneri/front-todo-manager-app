import React, { useState, useEffect } from "react";
import ToggleButton from "../../components/ToggleButton";
import Form from "../../components/Form";
import Task from "../../components/Task";
import styles from "./styles.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import api from "../../services/api";


const TodoList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [selectedTaskInfo, setSelectedTaskInfo] = useState(null);
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const userName = user ? user.data.name.slice(0, 9) : "";
  
  const openInfoModal = (task) => {
    setSelectedTaskInfo(task);
    setInfoModalIsOpen(true);
  };

  const handleFilterTasks = async (selectedOptions) => {
    const visibilityParam = "all";
    const statusParam = "all";

    try {
      const response = await api.get(`/tasks?visibility=${visibilityParam}&status=${statusParam}`);
      console.log("to aqui", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSignout = async () => {
    try {
      console.log("User: ", user);
      await signout();
      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleEditTask = (editedTask) => {
    if (user.data.uid !== editedTask.user.uid || editedTask.status == "finished") {
      alert("Não é possível editar essa tarefa.");
      return;
    }
    setEditingTask(editedTask);
    console.log(editedTask);
    setModalIsOpen(true); 
  };

  const handleDeleteTask = async (taskToDelete) => {
    console.log(taskToDelete);
    console.log(user.data.uid, taskToDelete.user.uid);
    if (user.data.uid !== taskToDelete.user.uid) {
      alert("Você não tem permissão para excluir esta tarefa.");
      return;
    }
    try {
      await api.delete(`/tasks/${taskToDelete.id}`);
      const updatedTasks = tasks.filter(task => task.id !== taskToDelete.id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="container-todo">
      <div className="header">
        <div className="app-name">TODO Manager App</div>
        <div className="welcome">
          <div className="user-icon">
            <FontAwesomeIcon icon={faUser} />
            <div className="user-dropdown">
              <a href="#">Perfil</a>
              <a href="#" onClick={handleSignout}>Sair</a>
            </div>
          </div>
          <span className="icon-name">Bem vindo, {userName}</span>
        </div>
      </div>
      <div className="new-task-button">
        <button type="submit" onClick={openModal}>Nova tarefa</button>
      </div>
      <Form actionName="Nova tarefa" isOpen={modalIsOpen} onClose={closeModal} setTasks={setTasks} buttonName="Criar"/>
      {editingTask && (
        <Form actionName="Editar tarefa" isOpen={modalIsOpen} onClose={closeModal} setTasks={setTasks} buttonName= "Editar" task={editingTask} />
      )}
      <ToggleButton Text="Filtros:" Options={["Públicas", "Privadas", "Novas", "Concluídas"]} onFilterTasks={handleFilterTasks}/>
      {tasks.map((task) => (
        <Task 
          key={task.id}
          task={task}
          onEdit={() => handleEditTask(task)}
          onDelete={() => handleDeleteTask(task)}
          openInfoModal={() => openInfoModal(task)}
        />
      ))}
      {selectedTaskInfo && (
        <Form
          actionName="Detalhes da Tarefa"
          isOpen={infoModalIsOpen}
          onClose={() => setInfoModalIsOpen(false)}
          task={selectedTaskInfo}
        />
      )}
      
    </div>
  );
};

export default TodoList;