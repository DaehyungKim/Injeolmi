'use client';

import { useSearchParams } from 'next/navigation';
import Modal from '@/components/ui/Modal';
import { useBoardDetail } from '../hooks/useBoardDetail';
import { BoardContent } from './BoardContent';
import type { iBoardItem } from '../types';
import { BoardActions } from './BoardActions';




export const BoardDetail = ({ initialDetail }: { initialDetail: iBoardItem }) => {
    const {
        showDeleteModal,
        password,
        setPassword,
        handleUpdate,
        handleDelete,
        openDeleteModal,
        closeDeleteModal,
    } = useBoardDetail(initialDetail);
    const searchParams = useSearchParams();
    const currentPage = searchParams.get('page') || "1";

    return (
        <div className="w-full max-w-[774px] mx-auto mt-12 p-4 border border-gray-200 rounded-md sm:p-6">
            <div>
                <h1 className="text-[2rem] font-bold mb-2 break-words">{initialDetail.title}</h1>
                <p className="text-base text-gray-500 mb-4">
                    작성자: {initialDetail.author} | 작성일: {new Date(initialDetail.createdAt).toLocaleString()}
                    {initialDetail.createdAt !== initialDetail.updatedAt && ` | 수정일: ${new Date(initialDetail.updatedAt).toLocaleString()}`}
                </p>
            </div>

            <div className="prose prose-stone max-w-none my-4 whitespace-pre-wrap break-words">
                <BoardContent content={initialDetail.content} />
            </div>

            <BoardActions onUpdate={handleUpdate} onDelete={openDeleteModal} currentPage={currentPage}/>

            {showDeleteModal && (
                <Modal
                    password={password}
                    setPassword={setPassword}
                    onConfirm={handleDelete}
                    onCancel={closeDeleteModal}
                />
            )}
        </div>
    );
};