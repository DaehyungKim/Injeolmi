import { Response, NextFunction } from 'express';
import { AuthRequest } from '../shared/type';
import { generateAccessToken, generateRefreshToken, authenticateRefreshToken, authenticateToken } from '../shared/utils/token';
import logger from 'jet-logger'
import { generateCsrfToken } from './csrf';

const EXCLUDED_PATHS = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/refresh',
    '/api/auth/csrf-token'
];



export const jwtMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    logger.info(req.path);
    if (EXCLUDED_PATHS.includes(req.path)) {
            return next();
        }

    authenticateToken(req, res, (accessTokenError) => {
        

        if (!accessTokenError) {
            return next();
        }

        if (accessTokenError.message !== 'TOKEN_EXPIRED') {

            return next(accessTokenError);
        }


        authenticateRefreshToken(req, res, (refreshTokenError) => {

            if (refreshTokenError) {
                return next(refreshTokenError);
            }


            const userPayload = req.user!;
            const newAccessToken = generateAccessToken({ userId: userPayload.userId, email: userPayload.email });
            const newRefreshToken = generateRefreshToken({ userId: userPayload.userId, email: userPayload.email });

            res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 15 * 60 * 1000 });
            res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });

            const newCsrfToken = generateCsrfToken(req, res);
            res.cookie('x-csrf-token', newCsrfToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000, 
            });


            return next();
        });
    });
};