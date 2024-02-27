import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

export const authRequired = (req, res, next) => {
        req.user = user
        next()
};