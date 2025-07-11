import React, { useState, useEffect } from "react";
import Loading from "../../assets/loading/loading";
import { ChildDeleteById } from "../../services/ChildApi.js";
import {
  monthGetById,
  monthPutById,
  monthPutPayById,
} from "../../services/MonthlyApi.js";
import {
  registrationGetHistory,
  registrationPost,
} from "../../services/RegistrationApi.js";

//css
import "../../styles/Child.css";
import "../../styles/VARS.css";
import "../../styles/Message.css";

function ChildCard({ criancas, token }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenMonth, setModalOpenMonth] = useState(false);
  const [modalOpenData, setModalOpenData] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [crianca, setCrianca] = useState(null);
  const [registro, setRegistro] = useState(null);
  const [listaCriancas, setListaCriancas] = useState(criancas);
  const [mensagem, setMensagem] = useState(null);
  const [mensagemError, setMensagemError] = useState(null);
  const [novoValorMensalidade, setNovoValorMensalidade] = useState("");

  useEffect(() => {
    setListaCriancas(criancas);
  }, [criancas]);

  async function fetchCriancas(id, nome) {
    try {
      const monthKid = await monthGetById(token, id);
      const lastRegistration = await registrationGetHistory(token, nome);

      if (lastRegistration.length > 0) {
        lastRegistration.sort(
          (a, b) => new Date(b.datahora) - new Date(a.datahora)
        );
        setRegistro(lastRegistration[0]);
      } else {
        setRegistro(null);
      }

      const kidData = {
        dataNascimento: monthKid.crianca.dataNascimento,
        avatarId: monthKid.crianca.avatarId,
        nomePai: monthKid.crianca.nomePai,
        telefonePai: monthKid.crianca.telefonePai,
        valorMensalidade: monthKid.valor,
        estaPago: monthKid.estaPaga,
        dataVencimento: monthKid.dataVencimento,
      };

      setCrianca(kidData);
    } catch (error) {
      console.error("Erro ao buscar dados da criança:", error.message);
      setCrianca(null);
    }
  }

  const openModal = (item) => {
    setSelectedChild(item);
    setModalOpen(true);
    fetchCriancas(item.id, item.nome);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedChild(null);
    setCrianca(null);
    setRegistro(null);
    setModalOpenData(false);
    setModalOpenMonth(false);
    setNovoValorMensalidade("");
  };

  const renderModalData = () => (
    <div className="modal-overlay" onClick={() => setModalOpenData(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {crianca ? (
          <>
            <div className="info-box">
              Data de Nascimento: {crianca.dataNascimento}
            </div>
            <div className="info-box">Nome do Pai: {crianca.nomePai}</div>
            <div className="info-box">
              Telefone do Pai: {crianca.telefonePai}
            </div>
            <div className="info-box">
              Valor da Mensalidade: R$ {crianca.valorMensalidade}
            </div>
            <div className="info-box">
              Status da Mensalidade: {crianca.estaPago ? "Paga" : "Pendente"}
            </div>
            <div className="info-box">
              Data de Vencimento: {crianca.dataVencimento}
            </div>
          </>
        ) : (
          <Loading />
        )}
        <button className="modal-close" onClick={() => setModalOpenData(false)}>
          Fechar
        </button>
      </div>
    </div>
  );

  const renderModalMonth = () => (
    <div className="modal-overlay" onClick={() => setModalOpenMonth(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Atualizar o valor da mensalidade do(a) {selectedChild.nome}</h2>
        <input
          type="number"
          placeholder="Digite o novo valor"
          value={novoValorMensalidade}
          onChange={(e) => setNovoValorMensalidade(e.target.value)}
        />
        <button
          className="modal-close"
          onClick={() => setModalOpenMonth(false)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );

  const renderModalDelete = () => (
    <div className="modal-overlay" onClick={() => setModalOpenDelete(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Excluir Criança</h2>
        <p>Tem certeza que deseja excluir {selectedChild.nome}?</p>
        <button
          className="button-yes"
          onClick={async () => {
            try {
              await ChildDeleteById(token, selectedChild.id);
              mostrarMensagem("Criança excluída com sucesso!");
              setListaCriancas(
                listaCriancas.filter((c) => c.id !== selectedChild.id)
              );
              setSelectedChild(null);
              setModalOpenDelete(false);
            } catch (error) {
              mostrarMensagemError("Erro ao excluir criança");
            }
          }}
        >
          Sim
        </button>
        <button
          className="modal-close"
          onClick={() => setModalOpenDelete(false)}
        >
          Não
        </button>
      </div>
    </div>
  );

  function mostrarMensagem(texto) {
    setMensagem(texto);
    setTimeout(() => {
      setMensagem(null);
    }, 3000);
  }

  function mostrarMensagemError(texto) {
    setMensagemError(texto);
    setTimeout(() => {
      setMensagemError(null);
    }, 3000);
  }

  function contrarioDoTipo(tipo) {
    return tipo === "ENTRADA" ? "SAIDA" : "ENTRADA";
  }

  async function registrarEntradaSaida(token, id, tipo) {
    try {
      const response = await registrationPost(token, id, tipo);
      mostrarMensagem("Registro de entrada/saída realizado com sucesso!");

      const novaLista = listaCriancas.map((c) =>
        c.id === id ? { ...c, eregistration: tipo } : c
      );
      setListaCriancas(novaLista);

      if (selectedChild?.id === id) {
        setSelectedChild({ ...selectedChild, eregistration: tipo });

        const historico = await registrationGetHistory(
          token,
          selectedChild.nome
        );
        if (historico.length > 0) {
          historico.sort((a, b) => new Date(b.datahora) - new Date(a.datahora));
          setRegistro(historico[0]);
        }
      }

      return response;
    } catch (error) {
      mostrarMensagemError("Erro ao registrar entrada/saída");
      throw error;
    }
  }
  async function marcarMensalidadeComoPaga(id) {
    try {
      const response = await monthPutPayById(token, id);
      mostrarMensagem("Mensalidade paga com sucesso!");
      return response;
    } catch (error) {
      mostrarMensagemError("Erro ao atualizar status da mensalidade");
      throw error;
    }
  }

  function formatarDataHora(isoString) {
    const data = new Date(isoString);
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");
    return `${horas}:${minutos}`;
  }

  return (
    <div className="dashboard-container">
      <div className="child-card-container">
        {listaCriancas.map((item) => (
          <div className="child-card" key={item.id}>
            <img
              src={item.avatar || "/default-avatar.png"}
              alt={item.nome}
              className="child-avatar"
            />
            <h3 className="child-name">{item.nome}</h3>
            <div
              className={`child-registro-status ${item.eregistration?.toLowerCase()}`}
            >
              {item.eregistration}
            </div>
            <button className="child-button" onClick={() => openModal(item)}>
              Selecionar
            </button>
          </div>
        ))}
      </div>

      {mensagem && <div className="toast-mensagem">{mensagem}</div>}
      {mensagemError && (
        <div className="toast-mensagemError">{mensagemError}</div>
      )}

      {modalOpen && selectedChild && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedChild.nome}</h2>

            {registro ? (
              <div
                className={
                  registro.tipo === "ENTRADA"
                    ? "registro-entrada info-box"
                    : "registro-saida info-box"
                }
              >
                Último registro: {registro.tipo} dia:{" "}
                {new Date(registro.datahora).toLocaleDateString("pt-BR")} às{" "}
                {formatarDataHora(registro.datahora)}
              </div>
            ) : (
              <div className="info-box modal-detalhe">Sem registro hoje</div>
            )}

            <div className="modal-buttons">
              <button
                onClick={() =>
                  registrarEntradaSaida(
                    token,
                    selectedChild.id,
                    contrarioDoTipo(selectedChild.eregistration)
                  )
                }
              >
                Registrar Entrada/Saída
              </button>
              {!crianca?.estaPago && (
                <button
                  onClick={() => marcarMensalidadeComoPaga(selectedChild.id)}
                >
                  Mensalidade Paga
                </button>
              )}
              <button onClick={() => setModalOpenData(true)}>
                Dados da Criança
              </button>
              <button onClick={() => setModalOpenDelete(true)}>
                Excluir Criança
              </button>
            </div>

            <button className="modal-close" onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      )}

      {modalOpenData && renderModalData()}
      {modalOpenMonth && renderModalMonth()}
      {modalOpenDelete && renderModalDelete()}
    </div>
  );
}

export default ChildCard;
