export function isHttpError(error: unknown): error is { status: number; message:string } {
  // 1. 객체이고, null이 아닌지 확인
  if (typeof error !== 'object' || error === null) {
    return false;
  }
  // 2. 'any' 없이 안전하게 속성의 타입까지 검사
  const errObj = error as Record<string, unknown>;
  return (
    typeof errObj.status === 'number' &&
    typeof errObj.message === 'string'
  );
}