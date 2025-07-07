import React from "react";
import SideMenu from "../feature/Menu/SideMenu";
import UserMenu from "../feature/Menu/UserMenu";
import Config from "../feature/Config/Config";

//css
import "../App.css";
import "../styles/VARS.css";

function ConfigPage() {
const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
const img = currentUser.img || "https://www.gravatar.com/avatar/?d=mp&f=y";

  return (
    <div className="container">
      <div className="side-menu">
        <SideMenu />
      </div>
      <div className="main-content">
      <Config />
      </div>
      <div className="user-menu">
        <UserMenu
          avatarUrl={img}
          onLogout={() => console.log("Logout executado")}
        />
      </div>
    </div>
  );
}

export default ConfigPage;
