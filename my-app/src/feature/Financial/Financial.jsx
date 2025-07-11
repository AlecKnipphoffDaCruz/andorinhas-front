import { useState, useEffect } from "react";
import ListChilds from './ListChilds';

//css



function Financial() {

const [token, setToken] = useState("");
const [userName, setUserName] = useState("");


useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (currentUser?.token) {
    setToken(currentUser.token);
  }
  setUserName(currentUser.name);
}, []);

  return(
  <div className="financial-page-container">
    <h1>Olá {userName}, Área Financeira</h1>
    <div className="payed-monthlys-container">
        <ListChilds />
    </div>
  </div>);
}
export default Financial;
