import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userPost } from "../../services/UserApi";

//css
import "../../styles/UserCreator.css";

export default function CriarUser() {
  const [token, setToken] = useState(null);
  const [preview, setPreview] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      try {
        const userObj = JSON.parse(currentUser);
        setToken(userObj.token);
      } catch (error) {
        console.error("Erro ao fazer parse do usuário:", error);
        navigate("/login");
      }
    } else {
      console.log("Usuário não está logado.");
      navigate("/login");
    }
  }, [navigate]);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      navigate("/login");
      return;
    }

    setLoading(true);

    const nome = e.target.nome.value;
    const email = e.target.email.value;
    const senha = e.target.senha.value;
    const role = e.target.role.value;
    
    try {
      await userPost(token, nome, email, senha, role, base64Image);
      alert("Usuário criado com sucesso!");
      navigate("/usuarios");
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      
      if (err.response?.status === 401) {
        alert("Token expirado. Faça login novamente.");
        navigate("/login");
      } else if (err.response?.status === 400) {
        alert("Dados inválidos. Verifique as informações.");
      } else if (err.response?.status === 409) {
        alert("Email já está em uso.");
      } else {
        alert("Erro ao criar usuário. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setPreview(null);
    setBase64Image(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="user-creator-container">
      <h2>Criar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="senha" placeholder="Senha" required />
        <select name="role" required>
          <option value="">Selecione um papel</option>
          <option value="ROLE_ADMIN">Admin</option>
          <option value="ROLE_MONITORA">Monitora</option>
        </select>

        <input type="file" accept="image/*" onChange={handleImagemChange} />

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Prévia" width={100} />
            <button type="button" onClick={clearImage}>Remover imagem</button>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar Usuário"}
        </button>
      </form>
    </div>
  );
}