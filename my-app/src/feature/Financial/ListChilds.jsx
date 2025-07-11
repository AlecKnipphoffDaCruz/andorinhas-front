import React, { useState, useEffect } from "react";
import {
  monthGetById,
  monthGetAllByX,
  monthPutById,
  monthPutPayById,
} from "../../services/MonthlyApi.js";
import { ChildGetAll } from "../../services/ChildApi.js";

export default function ListChilds() {
  const [kids, setKids] = useState([]);
  const [kidsU, setKidsU] = useState([]);
  const [kidsP, setKidsP] = useState([]);
  const [token, setToken] = useState("");
  const [modal, setModal] = useState(false);
  const [modalRegistration, setModalRegistration] = useState(false);
  const [modalAlter, setModalAlter] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [mensagemError, setMensagemError] = useState(null);
  const [selectedKid, setSelectedKid] = useState(null);
  const [value, setValue] = useState("");
  const [allRegs, setAllRegs] = useState([]);
  const [loadingRegs, setLoadingRegs] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (currentUser?.token) setToken(currentUser.token);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ChildGetAll(token);
        if (response.status === 200) {
          setKids(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    if (token) fetchData();
  }, [token]);

  useEffect(() => {
    async function relate() {
      try {
        const promises = kids.map((kid) =>
          monthGetById(token, kid.id)
            .then((res) => ({ data: res.data, crianca: kid }))
            .catch((err) => {
              console.error(`Erro ao buscar mês para o filho ${kid.id}:`, err);
              return null;
            })
        );

        const results = await Promise.all(promises);
        const listaP = [];
        const listaU = [];

        results.forEach((item) => {
          if (!item) return;
          if (item.data.estaPaga) {
            listaP.push({ ...item.data, crianca: item.crianca });
          } else {
            listaU.push({ ...item.data, crianca: item.crianca });
          }
        });

        setKidsP(listaP);
        setKidsU(listaU);
      } catch (e) {
        console.error("Erro geral em relate:", e);
      }
    }

    if (kids.length) relate();
  }, [kids]);

  useEffect(() => {
    async function fetchAllRegs() {
      if (!modalRegistration || !selectedKid) return;
      try {
        setLoadingRegs(true);
        const regs = await monthGetAllByX(token, selectedKid.crianca.id);
        setAllRegs(regs);
      } catch (e) {
        setAllRegs([]);
      } finally {
        setLoadingRegs(false);
      }
    }

    fetchAllRegs();
  }, [modalRegistration, selectedKid]);

  const mostrarMensagem = (texto) => {
    setMensagem(texto);
    setTimeout(() => setMensagem(null), 3000);
  };

  const mostrarMensagemError = (texto) => {
    setMensagemError(texto);
    setTimeout(() => setMensagemError(null), 3000);
  };

  const alter = async () => {
    if (!value || isNaN(value)) {
      mostrarMensagemError("Digite um valor válido!");
      return;
    }

    try {
      const response = await monthPutById(token, selectedKid?.id, value);
      if (response === 200) {
        mostrarMensagem("Valor alterado!");
        setModalAlter(false);
        setKids((prev) => [...prev]); // força atualização
      } else {
        mostrarMensagemError("Erro ao trocar valor!");
      }
    } catch (e) {
      mostrarMensagemError("Erro na requisição!");
    }
  };

  const payMark = async () => {
    try {
      const response = await monthPutPayById(token, selectedKid?.id);
      if (response === 200) {
        mostrarMensagem("Pagamento feito com sucesso!");
        setModal(false);
        setKids((prev) => [...prev]); // força atualização
      } else {
        mostrarMensagemError("Erro ao fazer pagamento");
      }
    } catch (e) {
      mostrarMensagemError("Erro na requisição!");
    }
  };

  const renderModal = () => selectedKid && (
    <div className="modal-overlay" onClick={() => setModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{selectedKid.crianca.nome}</h2>
        <button onClick={() => { setModalRegistration(true); setModal(false); }}>
          Registro de mensalidades
        </button>
        <button onClick={() => { setModalAlter(true); setModal(false); }}>
          Alterar valor da mensalidade
        </button>
        <button onClick={payMark}>Marcar como paga</button>
      </div>
    </div>
  );

  const renderModalRegistration = () => selectedKid && (
    <div className="modal-overlay" onClick={() => setModalRegistration(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{selectedKid.crianca.nome}</h2>
        {loadingRegs ? (
          <p>Carregando registros...</p>
        ) : (
          allRegs.map((reg, i) => (
            <div className="registration-container" key={i}>
              <p>valor: {reg.valor}</p>
              <p>data: {reg.dataPagamento}</p>
              <p>status: {reg.estaPaga ? "PAGO" : "NÃO PAGO"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderModalAlter = () => selectedKid && (
    <div className="modal-overlay" onClick={() => setModalAlter(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Nome: {selectedKid.crianca.nome}</h2>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Digite o valor novo"
        />
        <button onClick={alter}>Alterar</button>
      </div>
    </div>
  );

  return (
    <>
      <h2>Lista de Crianças com Mensalidade Paga</h2>
      <div className="lista-criancas">
        {kidsP.map((k, i) => (
          <div className="financial-kid-card" key={i}>
            <h2>{k.crianca.nome}</h2>
            <p>valor: {k.valor}</p>
            <p>data do pagamento: {k.dataPagamento}</p>
            <button onClick={() => { setSelectedKid(k); setModal(true); }}>
              Ver Mais
            </button>
          </div>
        ))}
      </div>

      <h2>Lista de Crianças com Mensalidade Não Paga</h2>
      <div className="lista-criancas">
        {kidsU.map((k, i) => (
          <div className="financial-kid-card" key={i}>
            <h2>{k.crianca.nome}</h2>
            <p>valor: {k.valor}</p>
            <p>data de vencimento: {k.dataVencimento}</p>
            <button onClick={() => { setSelectedKid(k); setModal(true); }}>
              Ver Mais
            </button>
          </div>
        ))}
      </div>

      {modal && renderModal()}
      {modalRegistration && renderModalRegistration()}
      {modalAlter && renderModalAlter()}
      {mensagem && <div className="toast-mensagem">{mensagem}</div>}
      {mensagemError && <div className="toast-mensagemError">{mensagemError}</div>}
    </>
  );
}
