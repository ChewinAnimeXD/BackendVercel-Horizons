import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { TOKEN_SECRET } from '../config.js';

const app = express();
app.use(cookieParser());

export const authRequired = (req, res, next) => {
    const token = req.cookies['token']; // Reemplaza 'nombre_de_la_cookie' con el nombre real de tu cookie
    console.log(req.cookies);

    req.user = null; // Definir user como null si no hay token o no se valida

    if (token) {
        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (!err) {
                req.user = user; // Si el token es válido, establecer el usuario en el objeto de solicitud
            }
            next(); // Continuar con la ejecución del middleware independientemente de si hay un token o no
        });
    } else {
        next(); // Continuar con la ejecución del middleware si no hay token
    }
};
