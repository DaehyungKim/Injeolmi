'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { LeftSide, RightSide } from '@/components/layout/menu';


const EXCLUDED_PATHS = ['/auth/login', '/auth/register'];

export const AppShell = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!isAuthenticated && !EXCLUDED_PATHS.includes(pathname)) {
            router.replace('/auth/login');
        }

        if (isAuthenticated && EXCLUDED_PATHS.includes(pathname)) {
            router.replace('/'); 
        }

    }, [ isAuthenticated, pathname, router]); 
    
    
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