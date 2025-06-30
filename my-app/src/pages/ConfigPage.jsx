import React from 'react' 
import SideMenu from ".../feature/Menu/SideMenu";
import Dashboard from ".../feature/Dashboard/DashBoard";
import UserMenu from ".../feature/Menu/UserMenu";

//css


function ConfigPage() {
  return (
    
<div className="container">
  <div className="side-menu">
    <SideMenu />
  </div>
  <div className="main-content">
    <Dashboard />
  </div>
  <div className = "user-menu"> 
    <UserMenu />
  </div>
</div>


  )
}

export default ConfigPage
