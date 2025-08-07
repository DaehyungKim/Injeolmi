'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { registerUser } from '@/app/(api)/authApi';

// 이메일 정규식
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 타입 정의
interface StrengthInfo {
    message: string;
    className: string;
}

const RegisterForm = () => {
    // 이메일 상태
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

    // 비밀번호 상태
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [strength, setStrength] = useState<number>(0);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        // 실시간 유효성 검사
        if (!newEmail) {
            setEmailError('이메일을 입력해주세요.');
        } else if (!EMAIL_REGEX.test(newEmail)) {
            setEmailError('올바른 이메일 형식을 입력해주세요.');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        const hasNumber = /\d/.test(newPassword);
        const hasLowercase = /[a-z]/.test(newPassword);
        const hasUppercase = /[A-Z]/.test(newPassword);
        const isLongEnough = newPassword.length >= 8;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

        // 실시간 유효성 검사
        if (!newPassword) {
            setPasswordError('비밀번호를 입력해주세요.');
        } else if (!(hasNumber && hasLowercase && hasUppercase && hasSpecialChar && isLongEnough)) {
            setPasswordError('비밀번호는 영문 대소문자, 숫자, 특수문자를 포함해\n8자 이상이어야 합니다.');
        } else {
            setPasswordError('');
        }

        // 보안 등급 계산
        let score = 0;
        if (hasNumber) score++;
        if (hasLowercase && hasUppercase) score++;
        if (isLongEnough) score++;
        if (hasSpecialChar) score++;

        if (score >= 4) setStrength(3);
        else if (score >= 2) setStrength(2);
        else if (newPassword.length > 0) setStrength(1);
        else setStrength(0);
    };

    // 보안 등급 정보 반환
    const getStrengthInfo = (): StrengthInfo => {
        switch (strength) {
            case 1: return { message: '보안 수준: 약함', className: 'text-red-600' };
            case 2: return { message: '보안 수준: 중간', className: 'text-orange-500' };
            case 3: return { message: '보안 수준: 강함', className: 'text-green-600' };
            default: return { message: '', className: '' };
        }
    };

    const strengthInfo = getStrengthInfo();
    // 에러 상태를 boolean 값으로 변환
    const showEmailError: boolean = !!emailError;
    const showPasswordError: boolean = !!passwordError;

    // 폼 제출 핸들러
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!showEmailError && !showPasswordError) {
            await registerUser({ email, password })
                .then(() => {
                    alert('회원가입이 완료되었습니다.');
                    setEmail('');
                    setPassword('');
                })
                .catch((error: Error) => {
                    alert(error.message);
                });
        } else {
            alert('입력한 정보를 확인해주세요.');
        }
    };

    return (
        <div className="box-border flex flex-col justify-center items-center m-0 p-20 rounded-md">
            <h1 className="block text-center mb-10">
                Please <span className="bg-[var(--color-primary)] px-5 py-1 text-white rounded-sm">Register</span>
            </h1>
            
            <form className="mx-auto w-96 mt-12" noValidate onSubmit={handleSubmit}>
                <div className="relative mb-7 mt-5 min-h-[130px]">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={`form-input ${showEmailError ? 'border-red-600 shake-target' : ''}`}
                            placeholder=" "
                            required
                        />
                        <label htmlFor="email" className={`form-label ${showEmailError ? 'error-label shake-target' : ''}`}>
                            <span>E</span>
                            <span>m</span>
                            <span>a</span>
                            <span>i</span>
                            <span>l</span>
                        </label>
                        {showEmailError && (
                            <span className="text-red-600 text-sm mt-1 whitespace-pre-wrap">
                                {emailError}
                            </span>
                        )}
                </div>

                <div className="relative mb-7 mt-5 min-h-[130px]">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className={`form-input ${showPasswordError ? 'border-red-600 shake-target' : ''}`}
                            placeholder=" "
                            required
                        />
                        <label htmlFor="password" className={`form-label ${showPasswordError ? 'error-label shake-target' : ''}`}>
                            <span>P</span>
                            <span>a</span>
                            <span>s</span>
                            <span>s</span>
                            <span>w</span>
                            <span>o</span>
                            <span>r</span>
                            <span>d</span>
                        </label>
                        {showPasswordError && (
                            <span className="text-red-600 text-sm mt-1 whitespace-pre-wrap">
                                {passwordError}
                            </span>
                        )}
                        {password.length > 0 && (
                            <div className={`text-sm mt-1 h-5 transition-colors duration-300 ${strengthInfo.className}`}>
                                {strengthInfo.message}
                            </div>
                        )}
                </div>

                <button 
                    className="cursor-pointer inline-block w-full bg-[var(--color-primary)] p-4 text-base rounded-md text-white border-0 focus:outline-none active:scale-[0.98] transition-transform;"
                    type="submit"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;