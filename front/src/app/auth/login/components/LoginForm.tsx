'use client';

import styles from './LoginForm.module.css';
import { login } from '@/app/(api)/authApi';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/(store)/store';
import { checkAuth } from '@/app/(store)/slice/authSlice';
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
        <div className={styles['login-container']}>
            <h1>Please <span className={styles.special}>Login</span></h1>
            <form className={styles['login-form']} noValidate onSubmit={loginhandler}>
                <div>
                    <input type="email" id="email" name="email" className={styles.input} placeholder=" " required  value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="email">
                        <span>E</span>
                        <span>m</span>
                        <span>a</span>
                        <span>i</span>
                        <span>l</span>
                    </label>
                </div>
                <div>
                    <input type="password" id="password" name="password" className={styles.input} placeholder=" " required  value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="password">
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
                <button className={styles.btn}  type="submit">Login</button>
            </form>
        </div>
    )
}
export default LoginForm;