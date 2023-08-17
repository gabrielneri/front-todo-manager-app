import React, { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Task = ({ task, onEdit, onDelete }) => {

  return (
    <div className="task-container"> 
      <label className="custom-checkbox-container">
        <input type="checkbox" className="checkbox"/>
        <div className="custom-checkbox"></div>
      </label>
      <div className="task-label">{task.title}</div>
      <div className="icons-task">
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => onEdit(task)}/>
        <FontAwesomeIcon icon={faTrash} onClick={() => onDelete(task)}/>
      </div>
    </div>
  );
};

export default Task;
