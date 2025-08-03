import { IParseObjectError } from 'jet-validators/utils';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';


/******************************************************************************
                                 클래스들
******************************************************************************/

/**
 * 상태 코드와 메시지가 있는 에러
 */
export class RouteError extends Error {
  public status: HttpStatusCodes;

  public constructor(status: HttpStatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}

/**
 * "parseObj" 에러 처리
 */
export class ValidationError extends RouteError {

  public static MESSAGE = 'parseObj() 함수에서 하나 이상의 ' + 
    '에러를 발견했습니다.';

  public constructor(errors: IParseObjectError[]) {
    const msg = JSON.stringify({
      message: ValidationError.MESSAGE,
      errors,
    });
    super(HttpStatusCodes.BAD_REQUEST, msg);
  }
}
