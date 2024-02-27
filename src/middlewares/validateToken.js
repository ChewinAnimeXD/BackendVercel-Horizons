import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ Message: "No token, autorización denegada " });

    if (token !== "undefined") {
        // Si el token no es "undefined", significa que es inválido
        return res.status(403).json({ message: "Token invalido" });
    }

    // Si el token es "undefined", continúa con la ejecución
    next();
};
