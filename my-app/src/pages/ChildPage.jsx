import React, {useEffect, useState} from 'react' 
import SideMenu from "../feature/Menu/SideMenu";
import CriancaPage from "../feature/Crianca/CriancaPage";
import UserMenu from "././feature/Menu/UserMenu";

//css





function ChildPage() {
  
  return (

<div className="container">
  <div className="side-menu">
    <SideMenu />
  </div>
  <div className="main-content" >
    <CriancaPage />
  </div>
  <div className = "user-menu"> 
    <UserMenu />
  </div>
</div>


  )
}

export default ChildPage
