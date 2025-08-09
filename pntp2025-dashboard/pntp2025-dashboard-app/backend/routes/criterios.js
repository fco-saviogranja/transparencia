const express = require('express');
const db = require('../models/db');
const router = express.Router();

// Cadastrar critério
router.post('/', (req, res) => {
  const { nome, descricao, prazo, responsavel_id } = req.body;
  if (!nome || !prazo || !responsavel_id) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
  }
  db.run(
    'INSERT INTO criterios (nome, descricao, prazo, responsavel_id, atualizado_em) VALUES (?, ?, ?, ?, ?)',
    [nome, descricao, prazo, responsavel_id, new Date().toISOString()],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id: this.lastID, nome, descricao, prazo, responsavel_id });
    }
  );
});

// Listar critérios
router.get('/', (req, res) => {
  db.all('SELECT * FROM criterios', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Atualizar critério
router.put('/:id', (req, res) => {
  const { nome, descricao, prazo, responsavel_id } = req.body;
  db.run(
    'UPDATE criterios SET nome=?, descricao=?, prazo=?, responsavel_id=?, atualizado_em=? WHERE id=?',
    [nome, descricao, prazo, responsavel_id, new Date().toISOString(), req.params.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'Critério atualizado.' });
    }
  );
});

// Deletar critério
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM criterios WHERE id=?', [req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Critério removido.' });
  });
});

module.exports = router;