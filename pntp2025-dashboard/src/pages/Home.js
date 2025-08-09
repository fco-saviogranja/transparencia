import React from 'react';
import { Link } from 'react-router-dom';
import './styles/prefeitura-jardim.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Bem-vindo ao Painel de Transparência PNTP 2025</h1>
            <p>Este é o seu ponto de partida para gerenciar alertas e notificações relacionadas ao PNTP 2025.</p>
            <div className="navigation">
                <Link to="/alerts" className="nav-link">Ver Alertas</Link>
                <Link to="/profile" className="nav-link">Meu Perfil</Link>
                <Link to="/dashboard" className="nav-link">Painel de Controle</Link>
            </div>
        </div>
    );
};

export default Home;