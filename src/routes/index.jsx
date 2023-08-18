import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import TodoList from "../pages/TodoList";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import useAuth from "../hooks/useAuth";

const Private = ({ Item, Other }) => {
  const { user } = useAuth(); 
  const signed = !!user;
  return signed ? <Item /> : <Other />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Private Item={TodoList} Other={Home}/>} />
        <Route path="/signin" element={<Private Item={TodoList} Other={Signin} />} />
        <Route path="/signup" element={<Private Item={TodoList} Other={Signup} />} />
        <Route path="/home" element={<Private Item={TodoList} Other={Home}/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;