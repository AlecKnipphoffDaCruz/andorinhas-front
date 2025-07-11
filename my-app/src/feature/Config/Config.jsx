import { useState, useEffect } from "react";
import { userPutById, userGetById } from "../../services/UserApi";

// css
import "../../styles/Message.css";
import "../../styles/Config.css";
import "../../styles/VARS.css";

function Config() {
  const [token, setToken] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const [mensagem, setMensagem] = useState(null);
  const [mensagemError, setMensagemError] = useState(null);

  const [base64Image, setBase64Image] = useState(null);

  const [oldRole, setOldRole] = useState("");
  const [oldDate, setOldDate] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [oldImg, setOldImg] = useState(null);

  const [newName, setNewName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [name, setName] = useState(null);
  const [id, setId] = useState(null);



  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    if (currentUser?.token) {
      setToken(currentUser.token);
    }

    setName(currentUser.name);
    setId(currentUser.id);

    setOldImg(currentUser.img || "https://www.gravatar.com/avatar/?d=mp&f=y");
  }, []);

useEffect(() => {
  if (token && id) {
    (async () => {
      try {
        const user = await userGetById(token, id);
        console.log("Usuário recebido:", user);

        const dataFormatada = user.dataAdmissao
          ? new Date(user.dataAdmissao).toLocaleDateString("pt-BR")
          : "";

        setOldRole(user.role);
        setOldDate(dataFormatada);
        setOldEmail(user.email || "");
        setNewName(user.nome || "");
        setEmail(user.email || "");
        setImg(user.userImg || "https://www.gravatar.com/avatar/?d=mp&f=y");
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    })();
  }
}, [token, id]);



  function mostrarMensagem(texto) {
    setMensagem(texto);
    setTimeout(() => setMensagem(null), 3000);
  }

  function mostrarMensagemError(texto) {
    setMensagemError(texto);
    setTimeout(() => setMensagemError(null), 3000);
  }

  async function save() {
    try {
      const response = await userPutById(
        token,
        id,
        newName,
        email,
        senha,
        base64Image
      );

      if (response.status === 200) {
        mostrarMensagem("Atualização feita com sucesso");
        setOpenModal(false);
        setOldEmail(email);
        setName(newName);
        if (base64Image != null) {setOldImg(base64Image);}
        setSenha("");
        setBase64Image(null);
      } else {
        mostrarMensagemError("Erro na tentativa de atualização");
      }
    } catch (err) {
      mostrarMensagemError("Erro no servidor ao atualizar.");
      console.error(err);
    }
  }

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

  const renderModal = () => (
  <div className="modal-overlay" onClick={() => setOpenModal(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button id="modal-close" onClick={() => setOpenModal(false)}>×</button>

      <h2>Atualizar informações</h2>

      <input
        type="text"
        placeholder="Digite o novo Nome"
        value={newName ?? ''}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Digite o novo Email"
        value={email ?? ''}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Digite sua nova Senha"
        value={senha ?? ''}
        onChange={(e) => setSenha(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={handleImagemChange} />

      {(preview || oldImg) && (
        <img src={preview || oldImg} alt="Prévia" width={200} />
      )}

      <div className="modal-buttons">
        <button className="confirmar" onClick={save}>Atualizar</button>
        <button className="cancelar" onClick={() => setOpenModal(false)}>Cancelar</button>
      </div>
    </div>
  </div>
);

  return (
    <div className="container-config">
      <h2>Hello, {name}!</h2>
      <img src={oldImg} alt="User Avatar" className="user-avatar" />
      <p>Email: {oldEmail}</p>
      <p>
        Cargo:{" "}
        {{
          ROLE_MONITORA: "Monitora",
          ROLE_ADMIN: "Administradora",
        }[oldRole] || oldRole}
      </p>
      <p>Data de Admissão: {oldDate}</p>
      <button onClick={() => setOpenModal(true)}>Alterar Informações</button>
      {openModal && renderModal()}
      {mensagem && <div className="toast-mensagem">{mensagem}</div>}
      {mensagemError && <div className="toast-mensagemError">{mensagemError}</div>}
    </div>
  );
}

export default Config;
