
import { getPost, BoardDetail } from '@/features/guest-board';
import { ReadPageProps } from '@/features/guest-board';

export default async function ReadPage({ params }: ReadPageProps) {

  const { id } = await Promise.resolve(params);
  const response = await getPost(id);


  return (
    <div>
      <BoardDetail initialDetail={response} />
    </div>
  );
};

