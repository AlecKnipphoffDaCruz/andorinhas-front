import React from "react";
import SideMenu from "../feature/Menu/SideMenu";
import Dashboard from "../feature/Dashboard/DashBoard";
import UserMenu from "../feature/Menu/UserMenu";
import Financial from '../feature/Financial/Financial';

//css
import "../App.css";
import "../styles/VARS.css";

function FinancialPage() {
const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
const img = currentUser.img || "https://www.gravatar.com/avatar/?d=mp&f=y";

  const name =  localStorage.getItem("name") || "Usuário";

  return (
    <div className="container">
      <div className="side-menu">
        <SideMenu />
      </div>
      <div className="main-content">
        <Financial />
      </div>
      <div className="user-menu">
        <UserMenu
          avatarUrl={img}
          onLogout={() => console.log("Logout executado")}
        />
        <UserMenu />
      </div>
    </div>
  );
}

export default FinancialPage;
