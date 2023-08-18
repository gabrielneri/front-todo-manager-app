import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import TodoList from "../pages/TodoList";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import useAuth from "../hooks/useAuth";
import api from "../services/api";

const Private = ({ Item }) => {
  const { user } = useAuth(); 
  console.log("user: ", user);
  const signed = !!user;
  console.log("Tem alguem logado? ", signed);
  return signed ? <Item /> : <Home />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Private Item={TodoList} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Private Item={TodoList} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;