import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import cookieParser from 'cookie-parser';
import { doubleCsrf } from 'csrf-csrf';
import BaseRouter from '@src/routes';

import Paths from '@src/common/constants/Paths';
import ENV from '@src/common/constants/ENV';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/util/route-errors';
import { NodeEnvs } from '@src/common/constants';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { isHttpError } from '@src/common/util/typeGuard';


const app = express();

// CSRF 설정
const {
  invalidCsrfTokenError, // CSRF 토큰 에러 핸들러
  doubleCsrfProtection, // CSRF 보호 미들웨어
  generateCsrfToken, // CSRF 토큰 생성 함수
} = doubleCsrf({
  getSecret: () => 'super-secret-key', // 운영환경에서는 환경변수로 관리
  getSessionIdentifier: (req) => req.headers['x-session-id'] as string || 'default-session', // 세션 식별자
  cookieName: 'x-csrf-token',
  cookieOptions: {
    httpOnly: true,
    secure: true, // HTTPS에서만 사용
    sameSite: 'none',
    maxAge: 60 * 60 * 1000,  // 1시간 동안 유효
  },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
});



// **** 미들웨어 **** //


// CORS 설정
app.use(cors({
  origin: true,
  credentials: true,
}));


// 기본 미들웨어
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// CSRF 보호 미들웨어 적용 (API 라우트에만)
app.use('/api', doubleCsrfProtection);


//다운로드
app.use('/uploads', express.static('public/uploads'));

// 개발 중에 호출된 라우트를 콘솔에 표시
if (ENV.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// 보안 설정
if (ENV.NodeEnv === NodeEnvs.Production) {
  // process.env 사용에 대한 ESLint 경고 비활성화
  // eslint-disable-next-line n/no-process-env
  if (!process.env.DISABLE_HELMET) {
    app.use(helmet());
  }
}



// API 추가, 미들웨어 다음에 와야 함
app.use(Paths.Base, BaseRouter);

// 에러 핸들러 추가
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (ENV.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  logger.info('에러 핸들러 호출됨');
  
  // CSRF 토큰 에러 처리
  if (err === invalidCsrfTokenError) {
    return res.status(403).json({ error: 'CSRF 토큰이 유효하지 않습니다' });
  }
  
  if (err instanceof EntityNotFoundError) {
    return res.status(404).json({ error: '리소스를 찾을 수 없습니다'});
  }
  if (err instanceof RouteError) {
    return res.status(400).json({ error: err.message });
  }
  if (isHttpError(err)) {
    logger.info(`HTTP 에러 발생: ${err.status} - ${err.message}`);
    return res.status(err.status).json({ error: err.message });
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
});





export { generateCsrfToken };

export default app;
