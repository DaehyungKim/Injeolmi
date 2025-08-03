// 이 파일은 환경 설정을 위해 process.env를 사용해야 하므로 ESLint 경고 비활성화
/* eslint-disable n/no-process-env */

import path from 'path';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';


// 환경 확인
const NODE_ENV = (process.env.NODE_ENV ?? 'development');

// "dotenv" 설정
const result2 = dotenv.config({
  path: path.join(__dirname, `./config/.env.${NODE_ENV}`),
});
if (result2.error) {
  throw result2.error;
}

// moduleAlias 설정
if (__filename.endsWith('js')) {
  moduleAlias.addAlias('@src', __dirname + '/dist');
}
