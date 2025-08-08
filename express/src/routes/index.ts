import { Router } from 'express';
import guestBoardRouter from '@src/features/guest-board/guest-board.routes';
import authRouter from '@src/features/auth/auth.routes';



/******************************************************************************
                                설정
******************************************************************************/

const apiRouter = Router();

// 게스트 게시판 라우터 연결
apiRouter.use('/guest-board', guestBoardRouter);
apiRouter.use('/auth', authRouter);


/******************************************************************************
                                기본 내보내기
******************************************************************************/

export default apiRouter;
