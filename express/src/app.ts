import logger from 'jet-logger';
import { AppDataSource } from './core/database';
import ENV from '@src/core/shared/constants/ENV';
import app from './server';
import { initializeSchedulers } from './features/guest-board/guest-board.scheduler';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import Redis from 'ioredis';


/******************************************************************************
                                redis 웹소켓
******************************************************************************/

const httpServer = http.createServer(app);
const wss = new WebSocketServer({ server: httpServer});
const REDIS_URL = process.env.UPSTASH_REDIS_URL;

if (!REDIS_URL) {
  logger.err('UPSTASH_REDIS_URL 환경 변수가 .env 파일에 설정되지 않았습니다.');
  process.exit(1); // 중요한 변수가 없으면 서버 실행 중단
}




const publisher = new Redis(REDIS_URL);
const subscriber = new Redis(REDIS_URL);
const CHANNEL = 'chat-room';

subscriber.subscribe(CHANNEL, (err) => {
  if (err) {
    logger.err(`Redis 채널 [${CHANNEL}] 구독 실패: ${err}`);
  } else {
    logger.info(`Redis 채널 [${CHANNEL}] 구독 성공`);
  }
});

subscriber.on('message', (channel, message) => {
  if (channel === CHANNEL) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
});

wss.on('connection', (ws: WebSocket) => {
  logger.info('클라이언트가 웹소켓에 연결되었습니다.');

  ws.on('message', (message: Buffer) => {
    // 받은 메시지를 Redis 채널로 발행
    publisher.publish(CHANNEL, message.toString());
  });

  ws.on('close', () => {
    logger.info('클라이언트 웹소켓 연결이 해제되었습니다.');
  });

  ws.on('error', (error) => {
    logger.err(`웹소켓 에러 발생: ${error}`);
  });
});


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
    httpServer.listen(ENV.Port, () => {
      logger.info(SERVER_START_MSG);
      logger.info(`웹소켓 서버가 ws://localhost:${ENV.Port}/ws 에서 실행 중입니다.`);
      initializeSchedulers();
    });
  })
  .catch((err: unknown) => {
    logger.err('데이터베이스 연결 실패: ' + String(err));
  });
