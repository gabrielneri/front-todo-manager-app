import React, { useState, useEffect } from "react";
import ToggleButton from "../../components/ToggleButton";
import Form from "../../components/Form";
import Task from "../../components/Task";
import styles from "./styles.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";


const TodoList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [selectedTaskInfo, setSelectedTaskInfo] = useState(null);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { user, signout } = useAuth();
  const [errorMessageTask, setErrorMessageTask] = useState({ taskId: null, message: "" });
  const [errorMessageKey, setErrorMessageKey] = useState(0);

  
  const navigate = useNavigate();

  const userName = user ? user.data.name.slice(0, 9) : "";
  
  const openInfoModal = (task) => {
    setSelectedTaskInfo(task);
    setInfoModalIsOpen(true);
  };

  const getVisibilityParam = (selectedOptions) => {
    if (selectedOptions.includes("option1") && selectedOptions.includes("option2")) {
      return "all";
    } else if (selectedOptions.includes("option1")) {
      return "public";
    } 
    console.assert(selectedOptions.includes("option2"));
    return "private";
  };

  const getStatusParam = (selectedOptions) => {
    if (selectedOptions.includes("option3") && selectedOptions.includes("option4")) {
      return "all";
    } else if (selectedOptions.includes("option3")) {
      return "not_finished";
    } 
    console.assert(selectedOptions.includes("option4"));
    return "finished";
  };

  const handleFilterTasks = async (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    const visibilityParam = getVisibilityParam(selectedOptions);
    const statusParam = getStatusParam(selectedOptions);
    try {
      const response = await api.get(`/tasks?visibility=${visibilityParam}&status=${statusParam}`);
      setTasks(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        signout();
        navigate("/home");
        return;
      }
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSignout = async () => {
    try {
      await signout();
      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleAddTask = (newTask) => {
    let visibilityParam = getVisibilityParam(selectedOptions);
    let statusParam = getStatusParam(selectedOptions);
    visibilityParam = visibilityParam === "public" ? "public_task" : visibilityParam;
    visibilityParam = visibilityParam === "private" ? "private_task" : visibilityParam;
    const shouldAddTask = (visibilityParam === "all" || visibilityParam === newTask.visibility) &&
      (statusParam === "all" || statusParam === newTask.status);

    if (shouldAddTask) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  const editTaskList = (editedTask) => {
    let visibilityParam = getVisibilityParam(selectedOptions);
    let statusParam = getStatusParam(selectedOptions);
    visibilityParam = visibilityParam === "public" ? "public_task" : visibilityParam;
    visibilityParam = visibilityParam === "private" ? "private_task" : visibilityParam;
    const shouldAddTask = (visibilityParam === "all" || visibilityParam === editedTask.visibility) &&
      (statusParam === "all" || statusParam === editedTask.status);
    console.log(visibilityParam, statusParam, editedTask);
    if (shouldAddTask) {
      setTasks((prevTasks) =>
        prevTasks.map((prevTask) =>
        prevTask.id === editedTask.id ? editedTask : prevTask
      ));
    } else {
      setTasks((prevTasks) =>
        prevTasks.filter((prevTask) => prevTask.id !== editedTask.id)
      );
    }
  };


  const handleEditTask = (editedTask) => {
    if (user.data.uid !== editedTask.user.uid || editedTask.status == "finished") {
      setErrorMessageTask({ taskId: editedTask.id, message: "Você não tem permissão para editar esta tarefa." });
      setErrorMessageKey(errorMessageKey + 1);
      return;
    }
    setEditingTask(editedTask);
    setErrorMessageTask({ taskId: null, message: "" });
    setErrorMessageKey(errorMessageKey + 1);
    setIsEditingModalOpen(true);
  };

  const handleDeleteTask = async (taskToDelete) => {
    if (user.data.uid !== taskToDelete.user.uid) {
      setErrorMessageTask({ taskId: taskToDelete.id, message: "Você não tem permissão para excluir esta tarefa." });
      setErrorMessageKey(errorMessageKey + 1);
      return;
    }
    try {
      await api.delete(`/tasks/${taskToDelete.id}`);
      const updatedTasks = tasks.filter(task => task.id !== taskToDelete.id);
      setTasks(updatedTasks);
      setErrorMessageTask({ taskId: null, message: "" }); 
      setErrorMessageKey(errorMessageKey + 1);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        signout();
        navigate("/home");
        return;
      }
      console.error("Erro ao excluir a tarefa:", error);
    }
  };

  const handleClearTasks = () => {
    setTasks([]);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeEditingModal = () => {
    setEditingTask(null);
    setIsEditingModalOpen(false); // Close the editing modal
  };

  return (
    <div className="container-todo">
      <div className="header">
        <div className="app-name">TODO Manager App</div>
        <div className="welcome">
          <div className="user-icon">
            <FontAwesomeIcon icon={faUser} />
            <div className="user-dropdown">
              <a href="#" onClick={handleSignout}>Sair</a>
            </div>
          </div>
          <span className="icon-name">Bem vindo, {userName}</span>
        </div>
      </div>
      <div className="new-task-button">
        <button type="submit" onClick={openModal}>Nova tarefa</button>
      </div>
      <Form 
        actionName="Nova tarefa" 
        isOpen={modalIsOpen} 
        onClose={closeModal} 
        setTasks={handleAddTask} 
        buttonName="Criar"
      />
      <Form 
        actionName="Editar tarefa" 
        isOpen={isEditingModalOpen} 
        onClose={closeEditingModal} 
        setTasks={editTaskList} 
        buttonName= "Editar" 
        task={editingTask} 
      />
      <ToggleButton 
        Text="Filtros:" 
        Options={["Públicas", "Privadas", "Novas", "Concluídas"]} 
        onFilterTasks={handleFilterTasks} 
        onClearTasks={handleClearTasks}
      />
      {tasks.map((task) => (
        <Task 
          key={`${task.id}-${errorMessageKey}`}
          task={task}
          onEdit={() => handleEditTask(task)}
          onDelete={() => handleDeleteTask(task)}
          openInfoModal={() => openInfoModal(task)}
          editTaskList={editTaskList}
          selectedOptions={selectedOptions}
          errorMessageFromTodo={task.id === errorMessageTask.taskId ? errorMessageTask.message : ""}
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