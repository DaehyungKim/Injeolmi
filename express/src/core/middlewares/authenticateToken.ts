import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from 'jet-logger';
import createError from 'http-errors';
import { AuthRequest } from '../shared/type';

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {


    const token = req.cookies.accessToken;





    if (!token) throw createError(401, 'EMPTY_TOKEN');


    jwt.verify(token, process.env.JWT_SECRET!, (error: any, user: any) => {
        if (error) {
            logger.info(error);

            if (error.name === 'TokenExpiredError') {
                throw createError(401, 'TOKEN_EXPIRED');
            }

            throw createError(401, 'INVALID_TOKEN');
        }
        req.user = user;
        next();
    })
}

export default authenticateToken;