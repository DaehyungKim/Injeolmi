import Link from 'next/link';
import { BoardList, getList } from '@/features/guest-board';


export default async function ListPage ({ searchParams }: { searchParams: { page?: string } }) {
    const _searchParams = await Promise.resolve(searchParams);
    const page = parseInt(_searchParams?.page || '1', 10);
    const response = await getList({ page, pageSize: 10, OTitle: '', OAuthor: '' });

    const initialProps = {
        initialList: response.items,
        initialPage: page,
        initialLastPage: Math.ceil(response.total / response.pageSize),
    };

    return (
        <div>
            <BoardList {...initialProps} />
            <div className="mt-1 text-center">
                <Link href="/guest-board/create" className="border border-[#ccc] p-0.5 bg-[#3b82f6] text-white">
                    글작성
                </Link>
            </div>
        </div>
    );
};



