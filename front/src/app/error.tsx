'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({error, reset} : {error: Error, reset: () => void}) {
    const router = useRouter();

    useEffect(() => {
        window.location.href = `/error?message=${encodeURIComponent(error.message)}`;
    }, [error]);
    

    return null // 딜레이시 로딩창 고려
}

