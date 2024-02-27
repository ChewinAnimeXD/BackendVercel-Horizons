import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";


export function createAccesToken(payload) {
    
    


    return new Promise (() => {
        
        const token = jwt.sign(payload, process.env.TOKEN_SECRET)
        res.cookie("jwt", token)
    })
}

