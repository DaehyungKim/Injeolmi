import cron from 'node-cron';
import guestBoardService from './guest-board.service';

export const initializeSchedulers = () => {
    console.log('스케쥴러 초기화중...');

    // 매일 새벽 4시에 이미지 정리 작업 실행
    cron.schedule('0 4 * * *', guestBoardService.cleanupOrphanImages, {
        timezone: "Asia/Seoul"
    });


    console.log('스케쥴러 초기화 완료');
};