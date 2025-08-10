'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deletePost } from '../api/boardApi';
import type { iBoardItem } from '../types';

export const useBoardDetail = (detail: iBoardItem) => {
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [password, setPassword] = useState('');


    
    const handleDelete = async () => {
        if (!password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        try {
            await deletePost(detail.id, password);
            alert('게시글이 삭제되었습니다.');
            router.push('/guest-board/list');
        } catch (error) {
            alert(error instanceof Error ? error.message : '게시글 삭제에 실패했습니다.');
        } finally {
            
            setShowDeleteModal(false);
            setPassword('');
        }
    };

    const openDeleteModal = () => setShowDeleteModal(true);
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setPassword('');
    };

    return {
        showDeleteModal,
        password,
        setPassword,
        handleDelete,
        openDeleteModal,
        closeDeleteModal,
    };
};