import React, { useState } from "react";
import ToggleButton from "../../components/ToggleButton";
import Form from "../../components/Form";
import Task from "../../components/Task";
import styles from "./styles.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import useAuth from "../../hooks/useAuth";


const TodoList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Tarefa 1", description: "Descrição 1", status: "Nova", visibility: "Pública" }, 
    { id: 2, title: "Tarefa 1", description: "Descrição 1", status: "Nova", visibility: "Pública" }, 
    { id: 3, title: "Tarefa 1", description: "Descrição 1", status: "Nova", visibility: "Pública" }, 
    { id: 4, title: "Tarefa 1", description: "Descrição 1", status: "Nova", visibility: "Pública" }, 
    { id: 5, title: "Tarefa 1", description: "Descrição 1", status: "Nova", visibility: "Pública" }, 
    { id: 6, title: "Tarefa 1", description: "Descrição 1", status: "Nova", visibility: "Pública" }, 
    { id: 7, title: "Tarefa 1", description: "Descrição 1", status: "Nova", visibility: "Pública" }, 
    { id: 8, title: "Tarefa 1", description: "Descrição 1", status: "Nova", visibility: "Pública" }, 
    { id: 9, title: "Tarefa 1", description: "Descrição 1", status: "Nova", visibility: "Pública" }, 
    { id: 10, title: "Tarefa 1", description: "Descrição 1", status: "Nova", visibility: "Pública" }, 
    { id: 11, title: "Tarefa 1", description: "Descrição 1", status: "Nova", visibility: "Pública" }, 
  ]);
  const [editingTask, setEditingTask] = useState(null);
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const userName = user ? user.data.name.slice(0, 9) : "";

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
    setEditingTask(editedTask);
    console.log(editedTask);
    setModalIsOpen(true); 
  };

  const handleDeleteTask = (taskToDelete) => {
    console.log("Excluir tarefa");
  };

  const handleNewTask = () => {
    console.log("Nova tarefa");
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
      <Form actionName="Nova tarefa" isOpen={modalIsOpen} onClose={closeModal} task={editingTask}/>
      {editingTask && (
        <Form actionName="Editar tarefa" isOpen={modalIsOpen} onClose={closeModal} task={editingTask} />
      )}
      <ToggleButton Text="Filtros:" Options={["Públicas", "Privadas", "Novas", "Concluídas"]}/>
      {tasks.map((task) => (
        <Task 
          key={task.id}
          task={task}
          onEdit={() => handleEditTask(task)}
          onDelete={() => handleDeleteTask(task)}
        />
      ))}

      
    </div>
  );
};

export default TodoList;