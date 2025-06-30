import React, { useState, useEffect } from "react";
import SideMenu from "./Menu/SideMenu";
import DashBoard from "./Dashboard/DashBoard";
import ChildCard from "./ChildCard";
import UserMenu from "./Menu/UserMenu";
import {ChildGetAll, ChildPost} from "../../services/ChildApi";





export default function CriancaPage() {
  const [token, setToken] = useState("");
  const [criancas, setCriancas] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalCreator, setModalCreator] = useState(false);
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [turma, setTurma] = useState("");
  const [avatarId, setAvatarId] = useState("");
  const [nomeDoPai, setNomeDoPai] = useState("");
  const [telefoneDoPai, setTelefoneDoPai] = useState("");


  async function fetchCriancas() {
    try {
      const data = await ChildGetAll(token);
      setCriancas(data);
    } catch (error) {
      console.error("Erro ao buscar dados das crianças:", error);
    }
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("currentUser"));
    if (userData && userData.token) {
      console.log("Token carregado:", userData.token);
      setToken(userData.token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchCriancas();
    }
  }, [token]);

  const criancasFiltradas = criancas.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  
const renderModalCreator = () => (
  <div className="modal-overlay" onClick={() => setModalCreator(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2>Criar nova criança</h2>

      <input
        type="text"
        placeholder="Digite o novo Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="date"
        placeholder="Digite a data de nascimento"
        value={dataNascimento}
        onChange={(e) => setDataNascimento(e.target.value)}
      />
      <input
        type="number"
        placeholder="Digite a turma"
        value={turma}
        onChange={(e) => setTurma(e.target.value)}
      />
      <input
        type="number"
        placeholder="Avatar"
        value={avatarId}
        onChange={(e) => setAvatarId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Digite o nome do pai"
        value={nomeDoPai}
        onChange={(e) => setNomeDoPai(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Digite o telefone do pai"
        value={telefoneDoPai}
        onChange={(e) => setTelefoneDoPai(e.target.value)}
      />

      <button className="child-button"
        onClick={async () => {
          try {
            const response = await ChildPost(
              token,
              null, 
              nome,
              dataNascimento,
              turma,
              avatarId,
              nomeDoPai,
              telefoneDoPai
            );
            if (response.status === 200) {
              console.log("Criança criada com sucesso!");
              fetchCriancas();
              setModalCreator(false);
              setNome("");
              setDataNascimento("");
              setTurma("");
              setAvatarId("");
              setNomeDoPai("");
              setTelefoneDoPai("");
            } else {
              console.error("Erro ao criar criança:", response);
            }
          } catch (error) {
            console.error("Erro na criação:", error);
          }
        }}
      >
        Criar
      </button>

      <button className="modal-close" onClick={() => setModalCreator(false)}>Cancelar</button>
    </div>
  </div>
);



  return (
    <div className="body">
      <header>
        <input className="search-input"
          type="text"
          placeholder="Buscar nome..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </header>
    <UserMenu token={token} setToken={setToken} />
      <div className="child-container">
        <ChildCard criancas={criancasFiltradas} token={token} />
      </div>

      <button className="child-creator-button"onClick = {() => setModalCreator(true)} >ChildCreator</button>
            {modalCreator && renderModalCreator()}
    </div>

    
  );
}
