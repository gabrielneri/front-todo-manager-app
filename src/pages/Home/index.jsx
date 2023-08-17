import React from "react";
import CreateTask from "../../assets/create.png";
import EditTask from "../../assets/edit.png";
import FinishTask from "../../assets/finished.png";
import { Link } from "react-router-dom";
import "./styles.css";


const Home = () => {
  const info = [
    {
      image: CreateTask,
      title: "Crie uma tarefa",
      text: "Você pode criar uma tarefa, definir o título, descrição e visibilidade.", 
    },
    {
      image: EditTask,
      title: "Edite uma tarefa",
      text: "É possível editar o título, descrição e visibilidade de uma tarefa.",
    },
    {
      image: FinishTask,
      title: "Conclua uma tarefa",
      text: "E por fim, quando uma tarefa for finalizada, marque-a como concluída.",
    },
  ];
  return (
    <div>
      <div className="section-top">
        <h1 className="primary-heading">TODO Manager App</h1>
        <p className="primary-text">
          Com o TODO Manager App você pode organizar melhor suas tarefas diárias.
        </p>
      </div>
      <div className="section-button">
        <Link to="/signup">
          <button>Cadastre-se</button>
        </Link>
        <h1 className="primary-text">ou</h1>
        <Link to="/signin">
          <button>Faça login</button>
        </Link>
      </div>
      <div className="section-bottom">
        {info.map((data) => (
          <div className="section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;