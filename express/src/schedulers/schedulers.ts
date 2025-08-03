import cron from 'node-cron';
import GuestBoardService from '@src/services/guestBoard/GuestBoardService';

export const initializeSchedulers = () => {
    console.log('스케쥴러 초기화중...');

    // 매일 새벽 4시에 이미지 정리 작업 실행
    cron.schedule('0 4 * * *', GuestBoardService.cleanupOrphanImages, {
        timezone: "Asia/Seoul"
    });


    console.log('스케쥴러 초기화 완료');
};