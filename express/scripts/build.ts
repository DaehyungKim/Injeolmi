import fs from 'fs-extra';
import logger from 'jet-logger';
import childProcess from 'child_process';


/**
 * 시작
 */
(async () => {
  try {
    // 현재 빌드 제거
    await remove('./dist/');
    await exec('npm run lint', './');
    await exec('tsc --build tsconfig.prod.json', './');
    // 복사 (삭제된 폴더들 제외)
    // await copy('./src/public', './dist/public');
    // await copy('./src/views', './dist/views');
    // await copy('./src/repos/database.json', './dist/repos/database.json');
    await copy('./temp/config.js', './config.js');
    await copy('./temp/src', './dist');
    await remove('./temp/');
  } catch (err) {
    logger.err(err);
    // process.exit 사용에 대한 ESLint 경고 비활성화
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  }
})();

/**
 * 파일 제거
 */
function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.remove(loc, err => {
      return (!!err ? rej(err) : res());
    });
  });
}

/**
 * 파일 복사
 */
function copy(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.copy(src, dest, err => {
      return (!!err ? rej(err) : res());
    });
  });
}

/**
 * 명령줄 명령어 실행
 */
function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return childProcess.exec(cmd, {cwd: loc}, (err, stdout, stderr) => {
      if (!!stdout) {
        logger.info(stdout);
      }
      if (!!stderr) {
        logger.warn(stderr);
      }
      return (!!err ? rej(err) : res());
    });
  });
}
