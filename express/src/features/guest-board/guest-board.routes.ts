import { Router } from 'express';
import awsUpload from '@src/core/middlewares/awsUpload';
import guestBoardController from './guest-board.controller';
import authenticateToken from '@src/core/middlewares/authenticateToken';




/******************************************************************************
                                설정
******************************************************************************/

const guestBoardRouter = Router();

guestBoardRouter.use(authenticateToken);

// POST /api/guest-board/create - 게시글 생성
guestBoardRouter.post('/create', guestBoardController.create);

// GET /api/guest-board/list - 게시글 목록 조회
guestBoardRouter.get('/list', guestBoardController.getList);

// Get /api/guest-board/read/:id - 게시글 상세 조회
guestBoardRouter.get('/read/:id', guestBoardController.getById);

// POST /api/guest-board/update/:id - 게시글 수정 전 데이터 조회
guestBoardRouter.post('/update/:id', guestBoardController.getPostForUpdate);

// PUT /api/guest-board/update/:id - 게시글 수정
guestBoardRouter.put('/update/:id', guestBoardController.updateById);

// DELETE /api/guest-board/delete/:id - 게시글 삭제
guestBoardRouter.delete('/delete/:id', guestBoardController.deleteById);



// Post /api/guest-board/upload - 게시글 이미지 업로드
const uploadBoard = awsUpload('guest-board');
guestBoardRouter.post('/upload', uploadBoard.single('image'), guestBoardController.uploadImage);


/******************************************************************************
                                기본 내보내기
******************************************************************************/

export default guestBoardRouter;
