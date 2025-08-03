'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/(store)/store';
import { checkAuth, logoutUser } from '@/app/(store)/slice/authSlice';
import Link from 'next/link';
import styles from './AuthNav.module.css';


const AuthNav = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(checkAuth());


    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    if (!isAuthenticated || !user) {
        return (
            <>
                <Link href="/auth/register">회원가입</Link>
                <Link href="/auth/login">로그인</Link>
            </>
        )
    }

    return (
        <>
        <button className={styles['button']} onClick={handleLogout}>로그아웃</button>
        <span>{user.email}님 하이</span>
        </>
    );
}

export default AuthNav;