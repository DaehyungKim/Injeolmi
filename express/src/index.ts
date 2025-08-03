import logger from 'jet-logger';
import { AppDataSource } from './dataSource';
import ENV from '@src/common/constants/ENV';
import server from './server';
import { initializeSchedulers } from './schedulers/schedulers';


/******************************************************************************
                                상수들
******************************************************************************/

const SERVER_START_MSG = (
  'Express server started on port: ' + ENV.Port.toString()
);


/******************************************************************************
                                  DB 연결 및 서버 실행
******************************************************************************/

AppDataSource.initialize()
  .then(() => {
    server.listen(ENV.Port, () => {
      logger.info(SERVER_START_MSG);
      initializeSchedulers();
    });
  })
  .catch((err: unknown) => {
    logger.err('데이터베이스 연결 실패: ' + String(err));
  });
