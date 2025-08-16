import { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import authService from './auth.service';
import createError from 'http-errors';
import { AuthRequest } from '@src/core/shared/type';
import { generateCsrfToken } from '@src/core/middlewares/csrf';
import { generateAccessToken, generateRefreshToken } from '@src/core/shared/utils/token';

class AuthController {
    
    // POST /api/auth/register - 사용자 등록
    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        logger.info("들어오긴 하니?")
        try {
            logger.info('사용자 등록 요청:', req.body.email);
            await authService.register(req.body);
            logger.info('사용자 등록 성공');
            res.status(201).json({ message: '회원가입 성공' });
        } catch (error) {
            logger.err(error);
            next(error);
        }
    }

    // POST /api/auth/login - 사용자 로그인
    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            logger.info('사용자 로그인 요청:', req.body);

            const user = await authService.login(req.body);

            const accessToken = generateAccessToken({ userId: user.id, email: user.email })

            const refreshToken = generateRefreshToken({ userId: user.id, email: user.email })


            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 15 * 60 * 1000 
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })


            res.status(200).json({ email: user.id });
        } catch (error) {
            logger.err(error);
            next(error);
        }
    }


    // POST /api/auth/logout - 사용자 로그아웃
    public async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            logger.info('사용자 로그아웃 요청');

            res.clearCookie('accessToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                path: '/',
            });
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                path: '/',
            });

            res.clearCookie('x-csrfToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                path: '/',
            });
            logger.info('사용자 로그아웃 성공');
            res.status(200).json({ message: '로그아웃 성공' });
        } catch (error) {
            logger.err(error);
            next(error);
        }
    }

    // Get /api/auth/me - 사용자 정보 조회
    public async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userEmail = (req as any).user?.email;
            logger.info('사용자 정보 조회 요청:', userEmail);
            if (!userEmail) {
                throw createError(401, '인증되지 않은 사용자입니다.'); 
            }
            res.status(200).json({ email: userEmail });
        } catch (error) {
            logger.err(error);
            next(error);
        }
    }

    // CSRF 토큰 제공 엔드포인트
    public async getCsrfToken(req: AuthRequest, res: Response): Promise<void> {
        logger.info(req)
        const csrfToken = generateCsrfToken(req, res);
        logger.info('CSRF 토큰 요청:' + csrfToken);
        res.json({
            csrfToken: csrfToken,
            message: 'CSRF 토큰을 성공적으로 가져왔습니다'
    });
    }
}

// 클래스의 인스턴스를 내보내서 사용 (싱글톤)
export default new AuthController();