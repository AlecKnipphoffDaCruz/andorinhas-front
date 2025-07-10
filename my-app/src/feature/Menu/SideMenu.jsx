  import React from 'react';
  import { Link, useLocation } from 'react-router-dom';

  //css
import '../../styles/SideMenu.css';
import "../../styles/VARS.css";


 function SideMenu() {
  const location = useLocation();

  return (
    <div className="container">
      <div className="sidebar">
        <h2 className="logo">LOGO</h2>
        <nav className="nav">
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
            <img src='src/imgs/menu/house-water-svgrepo-com.svg' alt='home' className="nav-icon" />
            Início
          </Link>

          <Link to="/criancas" className={location.pathname === '/criancas' ? 'active' : ''}>
            <img src="src/imgs/menu/child-face-svgrepo-com.svg" alt="Crianças" className="nav-icon" />
            Crianças
          </Link>

          <Link to="/usuarios" className={location.pathname === '/usuarios' ? 'active' : ''}>
            <img src="src/imgs/menu/person-svgrepo-com.svg" alt="Usuários" className="nav-icon" />
            Usuários
          </Link>

          <Link to="/financeiro" className={location.pathname === '/financeiro' ? 'active' : ''}>
            <img src="src/imgs/menu/money-bag-svgrepo-com.svg" alt="Financeiro" className="nav-icon" />
            Financeiro
          </Link>

          <Link to="/configuracoes" className={location.pathname === '/configuracoes' ? 'active' : ''}>
            <img src="src/imgs/menu/configuration-gear-options-preferences-settings-system-svgrepo-com.svg" alt="Configurações" className="nav-icon" />
            Configurações
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default SideMenu;
