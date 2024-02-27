import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const createAccesToken = (req, res, next) => {
  const { token } = req.cookies;
  const specificCookieValue = req.cookies['tu-cookie-especifica']; // Cambia 'tu-cookie-especifica' por el nombre de tu cookie específica

  if (!token || specificCookieValue !== '00001212') {
    return res.status(401).json({ Message: "No token o cookie específica, autorización denegada" });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    req.user = user;
    next();
  });
};