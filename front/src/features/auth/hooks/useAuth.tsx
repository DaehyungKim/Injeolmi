'use client'

import { login } from '../api/authApi';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { loginUser, logoutUser  } from '@/store/slice/authSlice';
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
            dispatch(loginUser());
            router.push('/');
            
        } catch (err) {
            alert('로그인에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleLogout = async() => {
        try {
            await dispatch(logoutUser()).unwrap();
            router.push('/auth/login');
        } catch(error) {
            alert('서버와의 연결이 원활하지 않아 로그아웃에 실패했습니다. 다시 시도해주세요.');
        }
        
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