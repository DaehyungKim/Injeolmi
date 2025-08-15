import jwt from 'jsonwebtoken';
import { UserPayload } from '../type';



export const generateAccessToken = (payload: UserPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '30s' });
};

export const generateRefreshToken = (payload: UserPayload): string => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '5m'})
}

