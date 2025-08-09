const db = require('./db');

// Tabela de usuários
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
  )
`);

// Tabela de critérios
db.run(`
  CREATE TABLE IF NOT EXISTS criterios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    descricao TEXT,
    prazo DATE,
    responsavel_id INTEGER,
    atualizado_em DATE,
    FOREIGN KEY (responsavel_id) REFERENCES users(id)
  )
`);

console.log('Tabelas criadas ou já existentes.');