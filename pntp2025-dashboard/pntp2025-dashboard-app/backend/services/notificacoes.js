const db = require('../models/db');
const { enviarEmail } = require('./email');

// Função para criar notificação e enviar e-mail se necessário
function criarNotificacao({ criterio_id, usuario_id, mensagem, tipo, email_destino }) {
  db.run(
    'INSERT INTO notificacoes (criterio_id, usuario_id, mensagem, enviada_em, tipo, status) VALUES (?, ?, ?, ?, ?, ?)',
    [criterio_id, usuario_id, mensagem, new Date().toISOString(), tipo, 'pendente'],
    (err) => {
      if (err) {
        console.error('Erro ao criar notificação:', err.message);
      } else if (tipo === 'email' && email_destino) {
        enviarEmail({
          to: email_destino,
          subject: 'Alerta de Prazo - PNTP 2025',
          text: mensagem
        }).then(() => {
          console.log('E-mail enviado para', email_destino);
        }).catch(console.error);
      }
    }
  );
}

// Função para verificar prazos e notificar responsáveis
function verificarPrazos() {
  const hoje = new Date();
  const limite = new Date();
  limite.setDate(hoje.getDate() + 3); // Notificar quem tem prazo em até 3 dias

  db.all(
    `SELECT c.*, u.email as email_destino FROM criterios c
     JOIN users u ON c.responsavel_id = u.id
     WHERE date(c.prazo) <= date(?) AND date(c.prazo) >= date(?)`,
    [limite.toISOString().split('T')[0], hoje.toISOString().split('T')[0]],
    (err, rows) => {
      if (err) return console.error(err);
      rows.forEach((criterio) => {
        criarNotificacao({
          criterio_id: criterio.id,
          usuario_id: criterio.responsavel_id,
          mensagem: `O critério "${criterio.nome}" está próximo do prazo final!`,
          tipo: 'email',
          email_destino: criterio.email_destino
        });
      });
    }
  );
}

// Para testar manualmente:
verificarPrazos();

module.exports = { criarNotificacao, verificarPrazos };