'use client';

import Link from 'next/link';
import type { PaginationProps } from '../types';

export const Pagination = ({ currentPage, lastPage, basePath }: PaginationProps) => {
    

    const disabledStyles = 'pointer-events-none cursor-default opacity-50 text-gray-400';

    return (
        <div className="flex justify-center items-center mt-5 gap-2.5">
            <Link
                href={`${basePath}?page=${currentPage - 1}`}
                className={currentPage <= 1 ? disabledStyles : 'hover:text-blue-600'}
                scroll={false}
            >
                이전
            </Link>
            
            <span className="font-bold text-blue-600">{currentPage}</span>
            
            <Link
                href={`${basePath}?page=${currentPage + 1}`}
                className={currentPage >= lastPage ? disabledStyles : 'hover:text-blue-600'}
                scroll={false}
            >
                다음
            </Link>
        </div>
    );
};