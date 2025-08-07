'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/Modal';
import {
  getPostForUpdate,
  updatePost,
  BoardForm,
  type iUpdate
} from '@/features/guest-board';


const GuestBoardUpdatePage = ({ params }: { params: { id: string } }) => {
  const [boardItem, setBoardItem] = useState<iUpdate | null>(null);
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  const loadPost = async () => {
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    try {
      const response = await getPostForUpdate(Number(params.id), password);
      setBoardItem({ ...response, preImages: response.preImages || [] });
      setShowModal(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '비밀번호가 일치하지 않거나 게시글을 불러올 수 없습니다.';
      alert(errorMessage);
      router.back();
    }
  };

  const handleUpdate = async (formData: iUpdate) => {
    try {
      const response = await updatePost(formData);
      alert('게시글이 수정되었습니다.');
      router.push(`/guest-board/read/${String(response)}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '게시글 수정에 실패했습니다.';
      alert(errorMessage);
    }
  };

  if (showModal) {
    return (
      <Modal
        password={password}
        setPassword={setPassword}
        onConfirm={loadPost}
        onCancel={() => router.push(`/guest-board/read/${params.id}`)}
      />
    );
  }

  return (
    <main>
      {boardItem && (
        <BoardForm
          mode="update"
          initialData={boardItem}
          onSubmit={handleUpdate}
          submitButtonText="글수정"
        />
      )}
    </main>
  );
};

export default GuestBoardUpdatePage;