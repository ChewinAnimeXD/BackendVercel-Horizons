import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { TOKEN_SECRET } from '../config.js';

const app = express();
app.use(cookieParser());

export const authRequired = (req, res, next) => {
    const cookiesString = req.headers.cookie; // Obtener la cadena de cookies de la cabecera
    if (!cookiesString) return res.status(401).json({ Message: "No hay cookies, autorización denegada" });

    // Analizar manualmente la cadena de cookies para encontrar la cookie con nombre 'token'
    const cookiesArray = cookiesString.split(';').map(cookie => cookie.trim());
    let token;
    for (const cookie of cookiesArray) {
        const [name, value] = cookie.split('=');
        if (name === 'token') {
            token = value;
            break;
        }
    }

    if (!token) return res.status(401).json({ Message: "No se encontró la cookie 'token', autorización denegada" });

    // Verificar el token JWT
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token inválido" });

        req.user = user;
        next();
    });
};

