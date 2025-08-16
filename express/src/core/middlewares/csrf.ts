import { doubleCsrf } from "csrf-csrf";
import { Request } from "express";
import { AuthRequest } from "../shared/type";
import logger from "jet-logger"
import jwt from 'jsonwebtoken';
import { UserPayload } from "../shared/type";

// CSRF 설정
export const {
    invalidCsrfTokenError, // CSRF 토큰 에러 핸들러
    doubleCsrfProtection, // CSRF 보호 미들웨어
    generateCsrfToken, // CSRF 토큰 생성 함수
} = doubleCsrf({
    getSecret: () => 'super-secret-key', // 운영환경에서는 환경변수로 관리
    getSessionIdentifier: (req: Request | AuthRequest) => {

        if ('user' in req && req.user) {
            return req.user.userId;
        }

        const token = req.cookies.accessToken;
        
        if (!token) {
            return "anonymous-session";
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
            return decoded.userId
        } catch (error) {
            return "anonymous-session";
        }
    },
    cookieName: 'x-csrf-token',
    cookieOptions: {
        httpOnly: true,
        secure: true, // HTTPS에서만 사용
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000,  // 1시간 동안 유효
    },
    size: 64,
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
});


