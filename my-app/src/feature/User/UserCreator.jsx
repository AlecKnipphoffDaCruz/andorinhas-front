import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userPost } from "../../services/UserApi";
import axios from "axios";

//css
import "../../styles/UserCreator.css";

export default function CriarUser() {

const [token, setToken] = useState(null);

useEffect(() => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    const userObj = JSON.parse(currentUser);
    setToken(userObj.token);
  } else {
    console.log("Usuário não está logado.");
  }
}, []);

  const [preview, setPreview] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const navigate = useNavigate();

  const handleImagemChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nome = e.target.nome.value;
    const email = e.target.email.value;
    const senha = e.target.senha.value;
    const role = e.target.role.value;
    
    try {
      await userPost(token, nome, email, senha, role, base64Image);
      alert("Usuário criado!");
      navigate("/usuarios");
      setUsers(users.filter(u => u.usuarioId !== selectedUserId));
    } catch (err) {
      console.error("Erro:", err);
    }
  };

  return (
    <div className="user-creator-container">
    <form onSubmit={handleSubmit}>
      <input type="text" name="nome" placeholder="Nome" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="senha" placeholder="Senha" required />
      <select name="role" required>
        <option value="ROLE_ADMIN">Admin</option>
        <option value="ROLE_MONITORA">Monitora</option>
      </select>

      <input type="file" accept="image/*" onChange={handleImagemChange} />

      {preview && <img src={preview} alt="Prévia" width={100} />}

      <button type="submit">Criar Usuário</button>
    </form>
    </div>
  );
}
