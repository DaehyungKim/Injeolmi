'use client';

import { useRouter } from 'next/navigation';
import {
  BoardForm,
  createPostAction,
  type Create
} from '@/features/guest-board';


export default function GuestBoardCreatePage() {
  const router = useRouter();

  const handleCreate = async (formData: Create) => {
    try {
      const response = await createPostAction(formData);
      alert('게시글이 작성되었습니다.');
      router.replace(`/guest-board/read/${response}`);
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

