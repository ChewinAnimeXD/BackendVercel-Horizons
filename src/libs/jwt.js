import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";


export function createAccesToken(payload) {
    return new Promise ((resolve, reject) => {
        
        jwt.sign(
            payload,
            TOKEN_SECRET,
        {
            expiresIn: "1d",
        },

        (err, token) => {
            console.log("token",token)
            if(err) reject(err)
            console.log("token2",token)
            resolve(token)              
            }
        );
    })
}

