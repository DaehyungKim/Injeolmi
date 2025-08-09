import { Request, Response, NextFunction } from 'express';
import guestBoardService from './guest-board.service';
import { iCreate, iList } from './models';
import logger from 'jet-logger';





class GuestBoardController {


  // POST /api/guest-board/create - 게시글 생성
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const result = await guestBoardService.create(req.body as iCreate);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    // GET /api/guest-board/list - 게시글 목록 조회
    public async getList(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await guestBoardService.getList(req.query as iList);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    // GET /api/guest-board/read/:id - 게시글 상세 조회
    public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const result = await guestBoardService.getById(Number(id));
            res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    }

    

    // POST /api/guest-board/update/:id - 게시글 수정 전 데이터 조회
    public async getPostForUpdate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { password } = req.body as { password: string };
            logger.info(`게시글 수정 전 데이터 조회 요청: id=${id}, password=${password}`);
            const result = await guestBoardService.getPostForUpdate(Number(id), password);
            res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    }

    // PUT /api/guest-board/update/:id - 게시글 수정
    public async updateById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const data = req.body as iCreate;
            const result = await guestBoardService.updateById(Number(id), data);
            res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    }


    // DELETE /api/guest-board/delete/:id - 게시글 삭제
    public async deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { password } = req.body as { password: string };
            await guestBoardService.deleteById(Number(id), password);
            res.status(204).send();
        } catch (error) {
            logger.info('게시글 삭제 중 오류 발생:');
            return next(error);
        }
    }

    // POST /api/guest-board/upload - 게시글 이미지 업로드
    public async uploadImage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.file) {
                res.status(400).json({ error: '파일이 업로드되지 않았습니다.' });
                return;
            }
            const file = req.file as Express.MulterS3.File;
            const s3FileUrl = file.location;
            const originalName = file.originalname;
            logger.info(`이미지 업로드 성공: ${s3FileUrl}, 원본 파일명: ${originalName}`);
            await guestBoardService.preUploadImage(s3FileUrl, originalName);
            res.status(200).json({ s3FileUrl });
        } catch (error) {
            return next(error);
        }
    }
}

// 클래스의 인스턴스를 내보내서 사용 (싱글톤)
export default new GuestBoardController();