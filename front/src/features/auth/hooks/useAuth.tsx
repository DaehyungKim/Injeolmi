'use client'

import { login } from '../api/authApi';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { checkAuth, logoutUser  } from '@/store/slice/authSlice';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!email || !password) {
            alert('이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            await login({ email, password });
            alert('로그인 성공');
            dispatch(checkAuth());
            router.push('/');
            
        } catch (err) {
            alert('로그인에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        alert('로그아웃 되었습니다.');
    }

    return {
        email,
        password,
        handleEmailChange,
        handlePasswordChange,
        handleLogin,
        handleLogout
    };
}