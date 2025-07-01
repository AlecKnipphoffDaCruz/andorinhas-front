import React from 'react' 
import SideMenu from "../feature/Menu/SideMenu";
import Dashboard from "../feature/Dashboard/DashBoard";
import UserMenu from "../feature/Menu/UserMenu";

//css
import "../App.css";
import "../styles/VARS.css";


function DashboardPage() {
  return (
    
<div className="container">
  <div className="side-menu">
    <SideMenu />
  </div>
  <div className="main-content">
    <Dashboard />
  </div>
  <div className = "user-menu"> 
    <UserMenu
  avatarUrl="https://i.pravatar.cc/150?img=8"
  onLogout={() => console.log("Logout executado")}
/>
  </div>
</div>


  )
}

export default DashboardPage;
