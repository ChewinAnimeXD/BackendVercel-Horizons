import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";


export function createAccesToken(payload) {
    //const token = jwt.sign(payload, process.env.TOKEN_SECRET)
    //res.cookie("jwt", token)


    return new Promise ((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
        {
            expiresIn: "1d",
        },

        

        (err, token) => {
            if(err) reject(err)
            resolve(token)              
            }
        );
    })
}

