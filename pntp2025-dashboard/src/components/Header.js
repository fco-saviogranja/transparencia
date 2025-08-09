import React from 'react';
import logo from '../assets/logo-prefeitura.png'; // coloque o logo em src/assets/

function Header() {
  return (
    <header>
      <img src={logo} alt="Prefeitura de Jardim" className="logo-prefeitura" />
      <h1>Painel de Transparência PNTP 2025</h1>
    </header>
  );
}

export default Header;