require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const cron = require('node-cron');

require('./models/initDb');

app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/users');
const criteriosRouter = require('./routes/criterios');
const { verificarPrazos } = require('./services/notificacoes');

app.use('/api/users', usersRouter);
app.use('/api/criterios', criteriosRouter);

app.get('/', (req, res) => {
  res.send('API PNTP 2025 rodando!');
});

// Agendar para rodar todo dia às 8h da manhã
cron.schedule('0 8 * * *', () => {
  console.log('Verificando prazos para notificações...');
  verificarPrazos();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

import React, { useEffect, useState } from 'react';

function AdminPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [criterios, setCriterios] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsuarios);

    fetch('/api/criterios')
      .then(res => res.json())
      .then(setCriterios);
  }, []);

  return (
    <div>
      <h2>Painel Administrativo</h2>
      <h3>Usuários</h3>
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>{u.name} ({u.email}) - {u.role}</li>
        ))}
      </ul>
      <h3>Critérios</h3>
      <ul>
        {criterios.map(c => (
          <li key={c.id}>{c.nome} - Prazo: {c.prazo}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;