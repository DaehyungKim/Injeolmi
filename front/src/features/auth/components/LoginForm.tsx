'use client';

import { login } from '@/features/auth/api/authApi';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { checkAuth } from '@/store/slice/authSlice';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const loginhandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email || !password) {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }
        try {
            const response = await login({ email, password });
            console.log(response);
            alert('로그인 성공');
            dispatch(checkAuth());
            router.push('/');
        } catch (error) {
            console.error('로그인 실패:', error);
            alert(error instanceof Error ? error.message : '로그인에 실패했습니다.');
        }
    }
    return (
        <div className="box-border flex flex-col justify-center items-center m-0 p-20 rounded-md">
            <h1 className="block text-center mb-10">
                Please <span className="bg-[var(--color-primary)] px-5 py-1 text-white rounded-sm">Login</span>
            </h1>
            <form className="mx-auto w-96 mt-12" noValidate onSubmit={loginhandler}>
                <div className="relative mb-7 mt-5">
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="form-input" 
                        placeholder=" " 
                        required  
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email" className="form-label">
                        <span>E</span>
                        <span>m</span>
                        <span>a</span>
                        <span>i</span>
                        <span>l</span>
                    </label>
                </div>
                <div className="relative mb-7 mt-5">
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="form-input" 
                        placeholder=" " 
                        required  
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password" className="form-label">
                        <span>P</span>
                        <span>a</span>
                        <span>s</span>
                        <span>s</span>
                        <span>w</span>
                        <span>o</span>
                        <span>r</span>
                        <span>d</span>
                    </label>
                </div>
                <button className="cursor-pointer inline-block w-full bg-[var(--color-primary)] p-4 text-base rounded-md text-white border-0 focus:outline-none active:scale-[0.98] transition-transform;" type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;