import {Secret, verify} from 'jsonwebtoken';
import config from '../config';
import {Request, Response, NextFunction} from "express";

function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({error: 'Access denied'});
    console.log(token);
    try {
        const decoded = verify(token, config.secretKey as Secret);
        if(typeof decoded === 'object') {
            req.body.userId = decoded.userId;
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Invalid token'});
    }
}

export default verifyToken;
