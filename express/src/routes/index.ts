import { Router } from 'express';
import GuestBoardRoutes from './guestBoard';
import authRouter from './auth';


/******************************************************************************
                                설정
******************************************************************************/

const apiRouter = Router();

// 게스트 게시판 라우터 연결
apiRouter.use('/guest-board', GuestBoardRoutes);
apiRouter.use('/auth', authRouter);


/******************************************************************************
                                기본 내보내기
******************************************************************************/

export default apiRouter;
