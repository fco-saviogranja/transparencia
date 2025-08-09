const { enviarEmail } = require('./email');

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