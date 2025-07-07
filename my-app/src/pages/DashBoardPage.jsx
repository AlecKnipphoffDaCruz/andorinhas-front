import React from "react";
import SideMenu from "../feature/Menu/SideMenu";
import Dashboard from "../feature/Dashboard/DashBoard";
import UserMenu from "../feature/Menu/UserMenu";

//css
import "../App.css";
import "../styles/VARS.css";

function DashboardPage() {
const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
const img = currentUser.img || "https://www.gravatar.com/avatar/?d=mp&f=y";

  const name =  localStorage.getItem("name") || "Usuário";

  return (
    <div className="container">
      <div className="side-menu">
        <SideMenu />
      </div>
      <div className="main-content">
        <Dashboard />
      </div>
      <div className="user-menu">
        <UserMenu
          avatarUrl={img}
          name={name}
          onLogout={() => console.log("Logout executado")}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
