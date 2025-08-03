import { Response } from 'supertest';


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
