'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { LeftSide, RightSide } from '@/components/layout/menu';
import { CSRFToken, checkAuth } from '@/store/slice/authSlice';


const EXCLUDED_PATHS = ['/auth/login', '/auth/register'];

export const AppShell = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, status } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(CSRFToken());
            dispatch(checkAuth());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (status === 'succeeded' || status === 'failed') {
            if (!isAuthenticated && !EXCLUDED_PATHS.includes(pathname)) {
                router.replace('/auth/login');
            }
            if (isAuthenticated && EXCLUDED_PATHS.includes(pathname)) {
                router.replace('/');
            }
        }
    }, [isAuthenticated, status, pathname, router]); 

    if (status === 'idle' || status === 'loading') {
        return null;
    }
    
    
    if (isAuthenticated && !EXCLUDED_PATHS.includes(pathname)) {
        return (
            <>
                <LeftSide />
                <main className="flex-1">
                    {children}
                </main>
                <RightSide />
            </>
        );
    }


    if (!isAuthenticated && EXCLUDED_PATHS.includes(pathname)) {
        return (
            <main className="flex-1 flex items-center justify-center">
                {children}
            </main>
        );
    }

    return null;
}