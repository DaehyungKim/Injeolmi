'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const errorMessage = searchParams.get('message') || '알 수 없는 오류가 발생했습니다.';

    return (
        <div>
            <h1>오류 발생</h1>
            <p>문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
            <p>에러 메시지: {errorMessage}</p>
            <br />
            <Link href="/">홈으로 돌아가기</Link>
            <button onClick={() => router.back()}>이전 페이지로</button>
        </div>
    );
}
