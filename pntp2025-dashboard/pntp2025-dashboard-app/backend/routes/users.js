import React, { useEffect, useState } from 'react';

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
    <div>
      <h2>Painel Administrativo</h2>
      <h3>Usuários</h3>
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>
            {u.name} ({u.email}) - {u.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;