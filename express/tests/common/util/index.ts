import { Response } from 'supertest';
import { IParseObjectError, parseJson } from 'jet-validators/utils';
import { isString } from 'jet-validators';


/******************************************************************************
                                타입들
******************************************************************************/

// 제네릭을 사용하여 'body'에 속성 추가
export type TRes<T = object> = Omit<Response, 'body'> & {
  body: T & { error?: string | IErrObj },
};

interface IErrObj {
  message: string;
  [key: string]: unknown;
}

interface IValidationErr {
  message: string;
  errors: IParseObjectError[];
}


/******************************************************************************
                                함수들
******************************************************************************/

/**
 * 검증 에러를 JSON으로 파싱
 */
export function parseValidationErr(arg: unknown): IValidationErr {
  if (!isString(arg)) {
    throw new Error('Not a string');
  }
  return parseJson<IValidationErr>(arg);
}
