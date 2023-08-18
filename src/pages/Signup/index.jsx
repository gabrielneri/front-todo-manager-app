import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./styles.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConf] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = async () => {
    try {
      const userData = { name, email, password, password_confirmation, };
      await signup(userData);
      navigate("/signin");
    } catch(error) {
      setError("Não foi possível cadastrar. Tente novamente.")
    }
  };

  return (
    <div className="container-signup"> 
      <label className="label-signup">TODO Manager App</label>
      <div className="content-signup">
        <Input 
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => [setName(e.target.value), setError("")]}
        />
        <Input 
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Confirme sua senha"
          value={password_confirmation}
          onChange={(e) => [setPasswordConf(e.target.value), setError("")]}
        />
        <label className="label-error-signup">{error}</label>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <label className="label-sign-in">
          Já tem uma conta?
          <strong className="strong-signup">
            <Link to="/signin">&nbsp;Entre</Link>
          </strong>
        </label>
      </div>
    </div>
  );
};

export default Signup;