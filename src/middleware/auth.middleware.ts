import jwt from 'jsonwebtoken';
import {Response, NextFunction,Request} from 'express';
import { AuthInfoRequest } from '../handlers'

const secret_key = process.env.SECRET_KEY || 'Secret_Key';


export default async function (req: AuthInfoRequest, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({message: 'Для просмотра данной страницы необходимо авторизоваться'}) 
        }
        const decoded = jwt.verify(token, secret_key);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({message: 'Для просмотра данной страницы необходимо авторизоваться'})
    }
}