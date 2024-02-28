import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { TOKEN_SECRET } from '../config.js';

const app = express();
app.use(cookieParser());

export const authRequired = (req, res, next) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGNhNjE0ZjhiN2YyM2RhMmI4YThjZSIsImlhdCI6MTcwOTA4NDE5NywiZXhwIjoxNzA5MTcwNTk3fQ.QXwg0kahkq-bwjCgggBg-yY95FtdJU635ml-POu8f54"; // Cambio aquí
    console.log(token)

    if (!token) return res.status(401).json({ Message: "No token, autorización denegada " });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "Token invalido"});

        req.user = user;
        next();
    });
};
