const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const db = require('./models/db');

const csvFilePath = path.resolve(__dirname, 'criterios.csv');

db.run(`
  CREATE TABLE IF NOT EXISTS notificacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    criterio_id INTEGER,
    usuario_id INTEGER,
    mensagem TEXT,
    enviada_em DATE,
    tipo TEXT, -- 'email' ou 'whatsapp'
    status TEXT DEFAULT 'pendente',
    FOREIGN KEY (criterio_id) REFERENCES criterios(id),
    FOREIGN KEY (usuario_id) REFERENCES users(id)
  )
`);

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Ajuste os nomes dos campos conforme o cabeçalho do seu CSV
    const { nome, descricao, prazo, responsavel_id } = row;
    db.run(
      'INSERT INTO criterios (nome, descricao, prazo, responsavel_id, atualizado_em) VALUES (?, ?, ?, ?, ?)',
      [nome, descricao, prazo, responsavel_id || null, new Date().toISOString()],
      (err) => {
        if (err) {
          console.error('Erro ao inserir critério:', err.message);
        }
      }
    );
  })
  .on('end', () => {
    console.log('Importação concluída!');
    db.close();
  });