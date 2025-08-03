import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: any;
}

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {

    
    const token = req.cookies.accessToken;

    
    if (!token) return res.status(401).json({ error: '토큰이 없음' });


    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
        if (err) return res.status(403).json({ error: '토큰이 유효하지 않음' });
        req.user = user;
        next();
    })
}

export default authenticateToken;