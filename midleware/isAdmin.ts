import db from '../db/db';
import {NextFunction, Request, Response} from "express";

function checkAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.body?.userId;
        db.getUserById(id).then(user => {
            if(user && user.role === 'admin') {
                next();
            } else {
                res.status(401).json({error: 'Access denied'});
            }
        })
    } catch (error) {
        res.status(500).json({error: 'internal server error'});
    }
}

export default checkAdmin;
