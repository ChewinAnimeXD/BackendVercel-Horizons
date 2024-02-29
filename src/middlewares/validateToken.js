import express from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import { tokensito } from '../controllers/auth.controller.js';
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

export const authRequired = (req, res, next) => {
    
    //console.log(token)

    const tokenB = req.cookies.TokenBack

    const token = tokenB;
    console.log("Este es el el token de authRequired", token)

    if (!token) return res.status(401).json({ Message: "No token, autorización denegada ", tokenB });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "Token invalido"});
        req.user = user;
        next();
    });
};
