import { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import authService from './auth.service';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
// import { generateCsrfToken } from '@src/server';


class AuthController {
    
    // POST /api/auth/register - 사용자 등록
    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
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

            const accessToken = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET!,
                { expiresIn: '15m' }
            )

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 15 * 60 * 1000 
            });


            res.status(200).json({ message: '로그인 성공' });
        } catch (error) {
            logger.err(error);
            next(error);
        }
    }

    // POST /api/auth/refresh - 리프레시 토큰 갱신
    public async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            logger.info('리프레시 토큰 갱신 요청');
            res.status(200).json({ message: '리프레시 토큰 갱신 성공' });
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
    // public async getCsrfToken(req: Request, res: Response): Promise<void> {
    //     const csrfToken = generateCsrfToken(req, res);
    //     logger.info('CSRF 토큰 요청:' + csrfToken);
    //     res.json({
    //         csrfToken: csrfToken,
    //         message: 'CSRF 토큰을 성공적으로 가져왔습니다'
    // });
    // }
}

// 클래스의 인스턴스를 내보내서 사용 (싱글톤)
export default new AuthController();