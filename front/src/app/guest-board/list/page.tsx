import Link from 'next/link';
import { BoardList, getList } from '@/features/guest-board';
import styles from './page.module.css';

const ListPage = async ({ searchParams }: { searchParams: { page?: string } }) => {
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
            <div className={styles.createButtonWrapper}>
                <Link href="/guest-board/create" className={styles.createButton}>
                    글작성
                </Link>
            </div>
        </div>
    );
};

export default ListPage;