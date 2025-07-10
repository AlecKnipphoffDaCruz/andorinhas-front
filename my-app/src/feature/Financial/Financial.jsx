import { useState } from "react";
import {ListPayed, ListUnpayed} from './ListChilds';

//css

const [token, setToken] = useState("");
const [userName, setUserName] = useState("");


useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (currentUser?.token) {
    setToken(currentUser.token);
  }
  setUserName(currentUser.name);
}, []);

function Financial() {
  <div className="financial-page-container">
    <h1>Olá {userName}, Área Financeira</h1>
    <div className="payed-monthlys-container">
        <ListPayed />
    </div>
    <div className="notpayed-monthlys-container">
        <ListUnpayed />
    </div>
  </div>;
}
export default Financial;
