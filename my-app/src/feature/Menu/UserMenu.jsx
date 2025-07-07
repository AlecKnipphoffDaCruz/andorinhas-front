import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import "../../styles/UserMenu.css";
import "../../styles/VARS.css";

export default function UserMenu({ avatarUrl, name }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowModal(false);
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <>
      <div className="user-icon" onClick={() => setShowModal(true)}>
        <img src={avatarUrl}/>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Deseja sair?</p>
            <button className="confirm" onClick={handleLogout}>Sair</button>
            <button className="cancel" onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </>
  );
}
