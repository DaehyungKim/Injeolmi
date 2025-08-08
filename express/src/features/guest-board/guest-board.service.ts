import logger from 'jet-logger';
import { ICreate, IList, IListResponse, IPost, IUpdate } from './models/IGuestBoard';
import { GuestBoard } from './entities/GuestBoard';
import { Image } from './entities/Image';
import { AppDataSource } from '@src/core/database/index';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import { extractImageUrl } from './utils/upload';
import { In, LessThan, IsNull } from 'typeorm';
import { promises as fs } from 'fs';
import path from 'path';
import createError from 'http-errors';



/******************************************************************************
                                함수들
******************************************************************************/

//게시글 생성
async function create(data: ICreate): Promise<number> {
    logger.info('=== 생성 서비스 호출됨 ===');

    const repo = AppDataSource.getRepository(GuestBoard);
    const guestBoard = repo.create({
        title: data.title,
        author: data.author,
        content: data.content,
        password: data.password,
    });
    await repo.save(guestBoard);

    imageProcessing(data, guestBoard)

    return guestBoard.id;
}


//게시글 목록 조회
async function getList({ page = 1, pageSize = 10, ...rest }: IList): Promise<IListResponse> {
    const { OTitle, OAuthor } = rest;


    const repo = AppDataSource.getRepository(GuestBoard);
    const [items, total] = await repo.findAndCount({
        order: { id: 'DESC' },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const formattedItems = items.map(board => ({
        id: board.id,
        title: board.title,
        author: board.author,
        createdAt: dayjs(board.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    }));
    return { items: formattedItems, total, page, pageSize };
}


//게시글 상세 조회
async function getById(id: number): Promise<IPost> {

    const repo = AppDataSource.getRepository(GuestBoard);
    const guestBoard = await repo.findOneByOrFail({ id });

    return {
        id: guestBoard.id,
        title: guestBoard.title,
        content: guestBoard.content,
        author: guestBoard.author,
        createdAt: dayjs(guestBoard.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: dayjs(guestBoard.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    };
}


//게시글 수정 전용 조회
async function getPostForUpdate(id: number, password: string): Promise<IUpdate> {
    const repo = AppDataSource.getRepository(GuestBoard);
    const guestBoard = await repo.findOneByOrFail({ id });
    const isMatch = await bcrypt.compare(password, guestBoard.password);
    if (!isMatch) {
        throw createError(401, '비밀번호가 일치하지 않습니다.');
    }
    const imageUrls: string[] = extractImageUrl(guestBoard.content);

    return {
        id: guestBoard.id,
        title: guestBoard.title,
        author: guestBoard.author,
        content: guestBoard.content,
        createdAt: dayjs(guestBoard.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        preImages: imageUrls,
    }
}


//게시글 수정

async function updateById(id: number, data: ICreate): Promise<number> {
    const repo = AppDataSource.getRepository(GuestBoard);
    const guestBoard = await repo.findOneByOrFail({ id });
    logger.info(JSON.stringify(data, null, 2));
    await repo.update(id, {
        title: data.title,
        author: data.author,
        content: data.content,
    });

    imageProcessing(data, guestBoard)
    logger.info(`게시글 ${id}이(가) 수정되었습니다.`);
    return id;
}

//게시글 삭제
async function deleteById(id: number, password: string): Promise<void> {
    const repo = AppDataSource.getRepository(GuestBoard);
    const guestBoard = await repo.findOneOrFail({
        where: { id },
        relations: ['image'],
    });
    const isMatch = await bcrypt.compare(password, guestBoard.password);
    if (!isMatch) {
        throw createError(401, '비밀번호가 일치하지 않습니다.');
    }
    await repo.delete(id);
    if (guestBoard.image && guestBoard.image.length > 0) {
        for (const image of guestBoard.image) {
            const filePath = path.join(process.cwd(), 'public', image.url);
            try {
                await fs.unlink(filePath);
                logger.info(`이미지 파일 ${filePath}이(가) 삭제되었습니다.`);
            } catch (error) {
                logger.warn(`이미지 파일 ${filePath}을(를) 삭제하는 중 오류 발생: ${error}`);
            }
        }
    }
    logger.info(`게시글 ${id}이(가) 삭제되었습니다.`);
}

//이미지 업로드 전처리
async function preUploadImage(filePath: string, originalName: string) {
    const repo = AppDataSource.getRepository(Image);
    const image = repo.create({
        url: filePath,
        fileName: originalName,
    });
    await repo.save(image);
    logger.info(`이미지 ${image.id}이(가) 업로드되었습니다.`);
}


//고아이미지 정리
async function cleanupOrphanImages(): Promise<void> {
    try {
        const time = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const imageRepo = AppDataSource.getRepository(Image);
        const orphanImages = await imageRepo.find({
            where: {
                createdAt: LessThan(time),
                guestBoard: IsNull(),
            },
        });
        if (orphanImages.length > 0) {
            logger.info(`오래된 이미지 ${orphanImages.length}개를 삭제합니다.`);
            for (const image of orphanImages) {
                const filePath = path.join(process.cwd(), 'public', image.url);
                try {
                    await fs.unlink(filePath);
                    logger.info(`이미지 파일 ${filePath}이(가) 삭제되었습니다.`);
                } catch (error) {
                    logger.warn(`이미지 파일 ${filePath}을(를) 삭제하는 중 오류 발생: ${error}`);
                }
            }
            await imageRepo.delete({ id: In(orphanImages.map(img => img.id)) });
        } else {
            logger.info('삭제할 오래된 이미지가 없습니다.');
        }
    } catch (error) {
        logger.err(`오래된 이미지 삭제 중 오류 발생: ${error}`);
    }
}


/******************************************************************************
                                기본 내보내기
******************************************************************************/

export default {
    create, getList, getById, deleteById, updateById, preUploadImage, getPostForUpdate, cleanupOrphanImages
} as const;



/******************************************************************************
                                내부 함수
******************************************************************************/

// 이미지 처리 함수
async function imageProcessing(data: ICreate, guestBoard: GuestBoard) {

    if (data.preImages && data.preImages.length > 0) {
        const imageRepo = AppDataSource.getRepository(Image);
        const imageUrls: string[] = extractImageUrl(data.content);
        logger.info(`추출된 이미지 URL: ${imageUrls.join(', ')}`);
        logger.info(data.preImages ? `이미지: ${data.preImages.join(', ')}` : '이미지 없음');
        const imageToDelete: string[] = data.preImages.filter(url => !imageUrls.includes(url));
        if (imageToDelete.length > 0) {
            logger.info(`삭제할 이미지 URL: ${imageToDelete.join(', ')}`);

            for (const url of imageToDelete) {
                const filePath = path.join(process.cwd(), 'public', url);
                try {
                    await fs.unlink(filePath);
                    logger.info(`이미지 파일 ${filePath}이(가) 삭제되었습니다.`);
                } catch (error) {
                    logger.warn(`이미지 파일 ${filePath}을(를) 삭제하는 중 오류 발생: ${error}`);
                }
            }


            await imageRepo.delete({ url: In(imageToDelete) });

        }

        const repoImageUrls = await imageRepo.find({
            where: { url: In(imageUrls) },
        });

        for (const image of repoImageUrls) {
            image.guestBoard = guestBoard;
        }
        await imageRepo.save(repoImageUrls);
    }


}