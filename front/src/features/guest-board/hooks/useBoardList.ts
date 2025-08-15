'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getList } from '../api/boardApi';
import type { BoardItem, BoardListInitialProps } from '../types';

export const useBoardList = ({ initialList, initialPage, initialLastPage }: BoardListInitialProps) => {
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const [list, setList] = useState<BoardItem[]>(initialList);
    const [lastPage, setLastPage] = useState<number>(initialLastPage);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {

        if (currentPage === initialPage) {
            setList(initialList);
            setLastPage(initialLastPage);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getList({ page: currentPage, pageSize: 10, OTitle: '', OAuthor: '' });
                setList(response.items);
                setLastPage(Math.ceil(response.total / response.pageSize));
            } catch (error) {
                alert(error instanceof Error ? error.message : '게시글 목록을 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [currentPage, initialList, initialLastPage, initialPage]);

    return { list, lastPage, currentPage, isLoading };
};