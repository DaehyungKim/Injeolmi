import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from 'jet-logger';
import createError from 'http-errors';
import { AuthRequest } from '../shared/type';


const authenticateRefreshToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        throw createError(401, 'EMPTY_REFRESH_TOKEN');
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET!, (error: any, user: any) => {
        if (error) {
            logger.info(error);

            if (error.name === 'TokenExpiredError') {
                throw createError(401, 'REFRESH_TOKEN_EXPIRED');
            }

            throw createError(401, 'INVALID_REFRESH_TOKEN');
        }

        req.user = user;
        next();
    });
};

export default authenticateRefreshToken;
