import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";


export function createAccesToken(payload) {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET)
    

    return res.cookie("jwt", token)


}

