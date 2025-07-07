import React, { useEffect, useState } from "react";
import SideMenu from "../feature/Menu/SideMenu";
import CriancaPage from "../feature/Child/ChildModal";
import UserMenu from "../feature/Menu/UserMenu";

//css
import "../App.css";
import "../styles/VARS.css";
import "../styles/Page.css";

function ChildPage() {
const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
const img = currentUser.img || "https://www.gravatar.com/avatar/?d=mp&f=y";

  return (
    <div className="container">
      <div className="side-menu">
        <SideMenu />
      </div>
      <div className="main-content">
        <CriancaPage />
      </div>
      <div className="user-menu">
        <UserMenu
          avatarUrl={img}
          onLogout={() => console.log("Logout executado")}
        />{" "}
      </div>
    </div>
  );
}

export default ChildPage;
