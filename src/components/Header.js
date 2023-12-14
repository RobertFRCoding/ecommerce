import React from 'react';
import { Link } from 'react-router-dom';
import MetamaskButton from './MetamaskButton';
import './Header.css'; // Estilo CSS

function Header() {
  return (
    <header className="main-header">
      <div className="background-image"></div>
      <nav>
        <ul className="nav-list">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/about">Acerca de</Link></li>
          <li><Link to="/contact">Contacto</Link></li>
          <li><Link to="/registroEmpresas">Registro Empresas</Link></li>
          <li><Link to="/registroProducto">Registrar Productos</Link></li>
          <li><Link to="/empresas">Empresas</Link></li>
          <li><MetamaskButton /></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

