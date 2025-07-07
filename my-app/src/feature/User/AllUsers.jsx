import { userGetAll, userDeleteById } from "../../services/UserApi";
import { useEffect, useState } from "react";

//css
import "../../styles/AllUsers.css";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);


  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  useEffect(() => {
    const token = currentUser.token;
    setToken(token);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      const response = await userGetAll(token);
      setUsers(response);
    };

    fetchUsers();
  }, [token]);

  async function deletar() {
    if (!selectedUserId) return;
    try {
      await userDeleteById(token, selectedUserId);
      setUsers(users.filter((u) => u.usuarioId !== selectedUserId));
      setShowModal(false);
      setSelectedUserId(null);
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
    }
  }

  function abrirModal(id) {
    setSelectedUserId(id);
    setShowModal(true);
  }

  function fecharModal() {
    setShowModal(false);
    setSelectedUserId(null);
  }

  return (
    <div className="all-users-container">
      {users.map((user) => (
        <div className="user-card" key={user.usuarioId}>
          <img
            src={user.userImg || "https://www.gravatar.com/avatar/?d=mp&f=y"}
            alt="User Avatar"
            className="user-avatar"
            style={
              user.nome === currentUser.name
                ? {
                    borderColor: "red",
                    borderStyle: "solid",
                    borderWidth: "2px",
                  }
                : {}
            }
          />
          <h2>{user.nome}</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>
            Data de Admissão:{" "}
            {user.dataAdmissao
              ? new Date(user.dataAdmissao).toLocaleDateString()
              : "Não informado"}
          </p>
          <button onClick={() => abrirModal(user.usuarioId)}>
            Deletar Usuário
          </button>
        </div>
      ))}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Deseja deletar este usuário?</p>
            <button className="confirm" onClick={deletar}>
              Deletar
            </button>
            <button className="cancel" onClick={fecharModal}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
