import { Router } from 'express';
import { upload } from '@src/common/util/multerConfig';
import authController from '@src/controllers/authController';
import authenticateToken from '@src/common/util/authenticateToken';



/******************************************************************************
                                설정
******************************************************************************/

const authRouter = Router();

// POST /api/auth/register - 사용자 등록
authRouter.post('/register', authController.register);

// POST /api/auth/login - 사용자 로그인
authRouter.post('/login', authController.login);

// POST /apt/auth/refresh - 리프레시 토큰 갱신
authRouter.post('/refresh', authController.refreshToken);

// POST /api/auth/logout - 사용자 로그아웃
authRouter.post('/logout', authController.logout);

// Get /api/auth/me - 사용자 정보 조회
authRouter.get('/me', authenticateToken, authController.getMe);

// authRouter.get('/csrf-token', authController.getCsrfToken);

export default authRouter;