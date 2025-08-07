import { getPost } from '@/features/guest-board/api/boardApi';
import { BoardDetail } from '@/features/guest-board/components/BoardDetail';

interface ReadPageProps {
  params: { id: string };
}

const ReadPage = async ({ params }: ReadPageProps) => {
  const { id } = await Promise.resolve(params);
  const response = await getPost(id);

  return (
    <div>
      <BoardDetail initialDetail={response} />
    </div>
  );
};

export default ReadPage;