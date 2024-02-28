import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { TOKEN_SECRET } from '../config.js';

const app = express();

// Ensure cookie parsing happens before route handlers
app.use(cookieParser());

export const authRequired = (req, res, next) => {
  const token = req.cookies['token'];

  if (!token) {
    return res.status(401).json({ message: 'No token, autorización denegada' });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.user = user;
    next();
  });
};

// Ejemplo de uso en una ruta protegida:
app.get('/tasks', authRequired, (req, res) => {
  // Aquí puedes acceder a los datos del usuario autenticado a través de req.user
  res.json({ message: 'Usuario autenticado correctamente' });
});
