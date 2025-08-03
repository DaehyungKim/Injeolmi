import logger from 'jet-logger';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import { AppDataSource } from '@src/dataSource';
import createError from 'http-errors';


async function register(data: { email: string; password: string }): Promise<void> {
    logger.info('=== 사용자 등록 서비스 호출됨 ===');

    const repo = AppDataSource.getRepository('User');

    const existingUser = await repo.findOneBy({ email: data.email });
    if (existingUser) {
        logger.warn(`이미 존재하는 사용자: ${data.email}`);
        throw createError(409, '이미 존재하는 이메일입니다.');
    }
    
    
    const user = repo.create({
        email: data.email,
        password: data.password,
        createdAt: dayjs().toDate(),
    });
    
    await repo.save(user);
    logger.info(`사용자 등록 성공: ${data.email}`);
}

async function login(data: { email: string; password: string }): Promise<{ id: string; email: string }> {
    logger.info('=== 사용자 로그인 서비스 호출됨 ===');

    const repo = AppDataSource.getRepository('User');
    const user = await repo.findOneBy({ email: data.email });

    if (!user) {
        logger.warn(`존재하지 않는 사용자: ${data.email}`);
        throw createError(401, '사용자를 찾을 수 없습니다.');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
        logger.warn(`비밀번호 불일치: ${data.email}`);
        throw createError(401, '비밀번호가 일치하지 않습니다.');
    }

    logger.info(`사용자 로그인 성공: ${data.email}`);
    return { id: user.id, email: user.email };
}

export default {
    register, login
}