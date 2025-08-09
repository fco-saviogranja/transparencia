const jwt = require('jsonwebtoken');

function autenticarAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido.' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido.' });
    if (user.role !== 'admin') return res.status(403).json({ error: 'Acesso restrito.' });
    req.user = user;
    next();
  });
}

module.exports = { autenticarAdmin };