import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'
import Cookies from "js-cookie";

export const authRequired = (req, res, next) => {
    const { token } = Cookies.get;
    console.log(token)
    console.log("cookies . get", Cookies.get)

    if (!token) return res.status(401).json({ Message: "No token, autorización denegada " });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "Token invalido"});

        req.user = user
        next()
    })

    
};