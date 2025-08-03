
'use client';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import styles from './BoardList.module.css';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getList } from '@/app/(api)/guestBoardApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { iBoardItem, iBoardListProps } from '@/app/(type)/guest-board/board';





const columnHelper = createColumnHelper<iBoardItem>()

const columns = [
    columnHelper.accessor('title', {
    header: () => '제목',
    cell: info => (
      <Link href={`/guest-board/read/${info.row.original.id}`}>
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('author', {
    header: () => '작성자',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('createdAt', {
    header: () => '작성일',
    cell: info => info.getValue(),
  }),
]

const BoardList = ({list, page, lastPage}: iBoardListProps) => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [csrList, setCsrList] = useState<iBoardItem[]>(list);
  const [csrLastPage, setCsrLastPage] = useState<number>(lastPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (currentPage === page) {
      setCsrList(list);
      setCsrLastPage(lastPage);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
        try {
          const response = await getList({ page: currentPage, pageSize: 10, OTitle: '', OAuthor: '' });
          setCsrList(response.items);
          setCsrLastPage(Math.ceil(response.total / response.pageSize));
        } catch (error) {
          alert(error instanceof Error ? error.message : '게시글 목록을 불러오는데 실패했습니다.');
        } finally {
          setIsLoading(false);
        }
    }

    fetchData()


  }, [currentPage, list, lastPage, page]);

  const table = useReactTable<iBoardItem>({
    data: csrList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })



    return (
    <div className="p-2">
      <table className={`${styles.boardTable} ${isLoading ? styles.loading : ''}`}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} onClick={() => router.push(`/guest-board/read/${row.original.id}`)}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <Link
          href={`/guest-board/list?page=${currentPage - 1}`}
          className={currentPage <= 1 ? 'disabled' : ''}
          scroll={false}
        >
          이전
        </Link>
        <span>{currentPage}</span>
        <Link
          href={`/guest-board/list?page=${currentPage + 1}`}
          className={currentPage >= csrLastPage ? 'disabled' : ''}
          scroll={false}
        >
          다음
        </Link>
      </div>
    </div>
  )
}

export default BoardList;