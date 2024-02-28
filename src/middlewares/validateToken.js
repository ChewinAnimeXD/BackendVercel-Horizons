import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { TOKEN_SECRET } from '../config.js';

const app = express();
app.use(cookieParser());

export const authRequired = (req, res, next) => {
    const token = req.cookies.token;

    console.log("Valor de la cookie 'token':", token);

    if (!token) return res.status(401).json({ Message: "No token, autorización denegada " });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) {
            console.error("Error al verificar el token:", err); // Agrega este registro
            return res.status(403).json({ message: "Token invalido"});
        }

        req.user = user;
        next();
    });
};
