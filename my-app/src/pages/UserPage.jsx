import React from "react";
import SideMenu from "../feature/Menu/SideMenu";
import Dashboard from "../feature/Dashboard/DashBoard";
import UserMenu from "../feature/Menu/UserMenu";
import CriarUser from "../feature/User/UserCreator";
import ListaUser from "../feature/User/UserList";

//css
import "../styles/UserPage.css";
import "../styles/VARS.css";

function UserPage() {
const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
const img = currentUser.img || "https://www.gravatar.com/avatar/?d=mp&f=y";
  return (
    <div className="container">
      <div className="side-menu">
        <SideMenu />
      </div>
      <div className="main-content">
        <CriarUser />
        <ListaUser />
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

export default UserPage;
