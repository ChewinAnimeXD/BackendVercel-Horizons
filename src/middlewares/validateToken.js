import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { TOKEN_SECRET } from '../config.js';

const app = express();
app.use(cookieParser());

export const authRequired = (req, res, next) => {
    const token = req.token; // Obtener el token desde la solicitud
    if (!token) return res.status(401).json({ Message: "No token, autorización denegada " });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "Token invalido"});

        req.user = user;
        next();
    });
};
