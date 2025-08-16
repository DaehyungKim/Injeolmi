import jwt from 'jsonwebtoken';
import { UserPayload } from '../type';
import { Response, NextFunction } from 'express';
import logger from 'jet-logger';
import createError from 'http-errors';
import { AuthRequest } from '../type';



export const generateAccessToken = (payload: UserPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '10s' });
};

export const generateRefreshToken = (payload: UserPayload): string => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '5m'})
}



export const authenticateToken = (req: AuthRequest, res: Response, callback: (error?: any) => void) => {
    const token = req.cookies.accessToken;
    
    if (!token) {
        return callback(createError(401, 'EMPTY_TOKEN'));
    }
    
    jwt.verify(token, process.env.JWT_SECRET!, (error: any, user: any) => {
        if (error) {
            logger.info(error);
            
            if (error.name === 'TokenExpiredError') {
                return callback(createError(401, 'TOKEN_EXPIRED'));
            }
            
            return callback(createError(401, 'INVALID_TOKEN'));
        }
        
        req.user = user;
        callback(); // 성공시 에러 없이 호출
    });
}

export const authenticateRefreshToken = (req: AuthRequest, res: Response, callback: (error?: any) => void) => {
    const token = req.cookies.refreshToken;
    
    if (!token) {
        return callback(createError(401, 'EMPTY_REFRESH_TOKEN'));
    }
    
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, (error: any, user: any) => {
        if (error) {
            logger.info(error);
            
            if (error.name === 'TokenExpiredError') {
                return callback(createError(401, 'REFRESH_TOKEN_EXPIRED'));
            }
            
            return callback(createError(401, 'INVALID_REFRESH_TOKEN'));
        }
        
        req.user = user;
        callback(); // 성공시 에러 없이 호출
    });
};


