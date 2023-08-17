import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import useAuth from "../../hooks/useAuth";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const user = await signin({ email, password });
      console.log("API:", user); 
      navigate("/");
    } catch (error) {
      setError("Não foi possível conectar.");
      console.error("Erro:", error);
    }
  };
  /*
  const handleGetUserInfo = async (token) => {
    try {
      const userInfo = await getUserInfo(token);
    } catch (error) {
    }
  };
  */
  return (
    <div className="container-signin">
      <label className="label-signin">TODO Manager App</label>
      <div className="content-signin">
        <Input 
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua password"
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError("")]}
        />
        <label className="label-error-signin">{error}</label>
        <Button Text="Entrar" onClick={handleLogin} />
        <label className="label-sign-up">
          Não tem uma conta?
          <strong className="strong-signin">
            <Link to="/signup">&nbsp;Registre-se</Link>
          </strong>
        </label>
      </div>
    </div>
  );
};

export default Signin;