import React, { useState, useEffect } from "react";
import Login from "../services/AuthApi.js";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

//css
import "../styles/Login.css";
import "../styles/VARS.css";
import "../App.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email inválido.");
      return;
    }

    setError("");

    try {
      const data = await Login(email, senha);
      console.log("Resposta do login:", data);

      if (data.token) {
        const decoded = jwtDecode(data.token);
        console.log("Token decodificado:", decoded);

        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: decoded.name,
            token: data.token,
            role: decoded.roles,
            img: decoded.img,
            id: decoded.id
          })
        );
       

        navigate("/dashboard");
      } else {
        setError("Email ou senha incorretos.");
        console.warn("Token ausente na resposta.");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Erro ao se conectar ao servidor.");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="seuemail@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          placeholder="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="current-password"
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
