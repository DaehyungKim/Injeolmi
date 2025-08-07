'use client';

import { useRouter } from 'next/navigation';
import {
  Create,
  BoardForm,
  type iCreate
} from '@/features/guest-board';

const GuestBoardCreatePage = () => {
  const router = useRouter();

  const handleCreate = async (formData: iCreate) => {
    try {
      const response = await Create(formData);
      alert('게시글이 작성되었습니다.');
      router.push(`/guest-board/read/${response}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '게시글 작성에 실패했습니다.';
      alert(errorMessage);
    }
  };

  return (
    <main>
      <BoardForm
        mode="create"
        onSubmit={handleCreate}
        submitButtonText="글작성"
      />
    </main>
  );
};

export default GuestBoardCreatePage;