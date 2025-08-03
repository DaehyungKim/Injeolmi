import BoardList from "./components/BoardList";
import { getList } from "@/app/(api)/guestBoardApi";
import Link from "next/link";
import { iBoardItem } from "@/app/(type)/guest-board/board";
import styles from './page.module.css';

const List = async ( { searchParams } : {searchParams: {page?: string} }) => {
    const _searchParams = await Promise.resolve(searchParams);
    const page = parseInt(_searchParams?.page || '1', 10)
    const response = await getList({ page, pageSize: 10, OTitle: '', OAuthor: '' });
    const list: iBoardItem[] = response.items;
    const lastPage = Math.ceil(response.total / response.pageSize );
    return (
        <div>
            <BoardList list={list} page={page} lastPage={lastPage} />
            <div className={styles.createButtonWrapper}>
                <button className={styles.createButton}>
                    <Link href="/guest-board/create">글작성</Link>
                </button>
            </div>
        </div>
    )
}

export default List;