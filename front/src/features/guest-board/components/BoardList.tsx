'use client';

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useBoardList } from '../hooks/useBoardList';
import { Pagination } from './Pagination';
import type { BoardItem, BoardListInitialProps } from '../types';

const columnHelper = createColumnHelper<BoardItem>();

export const BoardList = (props: BoardListInitialProps) => {
    const router = useRouter();
    const { list, lastPage, currentPage, isLoading } = useBoardList(props);

    const columns = [
        columnHelper.accessor('title', {
            header: '제목',
            cell: info => <Link href={`/guest-board/read/${info.row.original.id}?page=${currentPage}`}>{info.getValue()}</Link>,
        }),
        columnHelper.accessor('author', { header: '작성자', cell: info => info.getValue() }),
        columnHelper.accessor('createdAt', { header: '작성일', cell: info => info.getValue() }),
    ];

    const table = useReactTable<BoardItem>({
        data: list,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-2">
            <table className={`border border-gray-300 mx-auto ${isLoading ? 'opacity-50 transition-opacity duration-200 ease-in-out' : ''}`}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="border-b border-r border-gray-300 px-[100px] py-[5px]">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="border-b border-gray-300">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="cursor-pointer" onClick={() => router.push(`/guest-board/read/${row.original.id}?page=${currentPage}`)}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="text-center border border-gray-300">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} lastPage={lastPage} basePath="/guest-board/list" />
        </div>
    );
};