import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../styles/prefeitura-jardim.css';

function AdminPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    fetch('/api/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setUsuarios(data));
  }, [token]);

  return (
    <>
      <Header />
      <div className="container">
        <h2>Painel Administrativo</h2>
        {/* Exemplo de alerta */}
        <div className="alert alert-success">Bem-vindo, administrador!</div>
        {/* Tabela de usuários */}
        <h3>Usuários</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Perfil</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => setEditando(u)}>Editar</button>
                  <button onClick={() => excluirUsuario(u.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="footer">
        Prefeitura de Jardim &copy; 2025
      </footer>
    </>
  );
}

export default AdminPanel;