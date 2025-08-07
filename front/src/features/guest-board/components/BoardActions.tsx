'use client';

import Link from 'next/link';
import styles from './BoardDetail.module.css';


export const BoardActions = ({ onUpdate, onDelete, currentPage }: { onUpdate: () => void; onDelete: () => void; currentPage: string }) => {
    const baseButtonStyles = "px-4 py-2 font-semibold text-white rounded-md transition-colors focus:outline-none ";

    return (
        <div className="mt-4 flex justify-end gap-2">
            <Link
                href={`/guest-board/list?page=${currentPage}`}
                className={`${baseButtonStyles} bg-blue-500 hover:bg-blue-600 focus:ring-blue-500`}
            >
                목록
            </Link>
            <button
                onClick={onUpdate}
                className={`${baseButtonStyles} bg-green-500 hover:bg-green-600 focus:ring-green-500`}
            >
                수정
            </button>
            <button
                onClick={onDelete}
                className={`${baseButtonStyles} bg-red-500 hover:bg-red-600 focus:ring-red-500`}
            >
                삭제
            </button>
        </div>
    );
};