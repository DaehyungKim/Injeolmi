'use client';

import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';

export const LoginForm = () => {

    const { email, password, handleEmailChange, handlePasswordChange, handleLogin } = useAuth();

    return (
        <div className="box-border flex flex-col justify-center items-center m-0 p-20 rounded-md">
            <h1 className="block text-center mb-10">
                Please <span className="bg-[var(--color-primary)] px-5 py-1 text-white rounded-sm">Login</span>
            </h1>
            <form className="mx-auto w-96 mt-12" noValidate onSubmit={handleLogin}>
                <div className="relative mb-7 mt-5">
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="form-input" 
                        placeholder=" " 
                        required  
                        value={email} 
                        onChange={handleEmailChange}
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
                        onChange={handlePasswordChange}
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
            <div className="mt-5">
                <Link href="/auth/register">회원가입</Link>
            </div>
        </div>
    )
}

