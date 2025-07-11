import React, { useState, useEffect } from "react";
import FinanceChart from "../../graphs/FinancialGraph";
import WeeklyChart from "../../graphs/WeeklyGraph.jsx";
import Loading from "../../assets/loading/loading.jsx";
import {
  registrationsGetToday,
  registrationTotalPresenca,
} from "../../services/RegistrationApi";
import { userGetAll } from "../../services/UserApi";
import { ChildGetAll } from "../../services/ChildApi";
import { monthGetQuantPending } from "../../services/MonthlyApi";
import { gastoGet, ganhoGet } from "../../services/MoneyApi";

//css
import "../../styles/Dashboard.css";
import "../../styles/VARS.css";

function Dashboard() {
  const [kidsToday, setKidsToday] = useState(null);
  const [token, setToken] = useState(null);
  const [name, setName] = useState('');
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalChildren, setTotalChildren] = useState(null);
  const [totalMonthly, setTotalMonthly] = useState(null);
  const [totalGanho, setGanho] = useState(null);
  const [totalGasto, setGasto] = useState(null);
  const [TotalSemana, setTotalSemana] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (currentUser.token) {
      setToken(currentUser.token);
      setName(currentUser.name);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    async function fetchData() {
      try {
        const presencas = await registrationsGetToday(token);
        setKidsToday(presencas);

        const usuarios = await userGetAll(token);
        setTotalUsers(usuarios.length);

        const criancas = await ChildGetAll(token);
        setTotalChildren(criancas.length);

        const mensalidade = await monthGetQuantPending(token);
        setTotalMonthly(mensalidade);

        const gasto = await gastoGet(token);
        setGasto(gasto);

        const ganho = await ganhoGet(token);
        setGanho(ganho);

        const semana = await registrationTotalPresenca(token);
        setTotalSemana(semana);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, [token]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h2>Olá {name}, bem vindo ao Dashboard!</h2>
        <div className="cards-container">
          <div className="card" id="user">
            <img
              src="src/imgs/dash/teacherSVG.png"
              alt="monitora"
              className="card-img"
            />
            <h2>Usuários</h2>
            <p>{totalUsers !== null ? totalUsers : <Loading />}</p>
          </div>

          <div className="card" id="monthly">
            <img
              src="src/imgs/dash/atention.png"
              alt="mensalidade"
              className="card-img"
            />
            <h2>Mensalidades Pendentes</h2>
            <p>{totalMonthly !== null ? totalMonthly : <Loading />}</p>
          </div>

          <div className="card" id="child">
            <img
              src="src/imgs/dash/presenca.png"
              alt="presenca"
              className="card-img"
            />
            <h2>Presenças Hoje</h2>
            <p>{kidsToday !== null ? kidsToday : <Loading />}</p>
          </div>

          <div className="card" id="child-total">
            <img
              src="src/imgs/dash/childSVG.png"
              alt="crianca"
              className="card-img"
            />
            <h2>Crianças Matriculadas</h2>
            <p>{totalChildren !== null ? totalChildren : <Loading />}</p>
          </div>
        </div>

        <div className="graph-container">
          <div className="graph-card">
            <FinanceChart entrada={totalGanho} saida={totalGasto} />
          </div>
          <div className="graph-card">
            <WeeklyChart data={TotalSemana} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
