'use client';

import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { registerUser } from '@/app/(api)/authApi';
import styles from './RegisterForm.module.css';

// 이메일 정규식
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const RegisterForm = () => {
    // 이메일 상태
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    // 비밀번호 상태
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [strength, setStrength] = useState(0);

    
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            setPasswordError('비밀번호는 영문 대소문자, 숫자, 특수문자를 포함해 8자 이상이어야 합니다.');
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
    const getStrengthInfo = () => {
        switch (strength) {
            case 1: return { message: '보안 수준: 약함', className: 'strength-weak' };
            case 2: return { message: '보안 수준: 중간', className: 'strength-medium' };
            case 3: return { message: '보안 수준: 강함', className: 'strength-strong' };
            default: return { message: '', className: '' };
        }
    };

    const strengthInfo = getStrengthInfo();
    // 에러 상태를 boolean 값으로 변환
    const showEmailError = !!emailError;
    const showPasswordError = !!passwordError;

    // 폼 제출 핸들러
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!showEmailError && !showPasswordError) {
            await registerUser({ email, password })
                .then(() => {
                    alert('회원가입이 완료되었습니다.');
                    setEmail('');
                    setPassword('');
                })
                .catch((error) => {
                    alert(error.message);
                });
            
        } else {
            console.log('폼 제출 실패: 유효하지 않은 입력');
        }
    };

    return (
        <form className={styles['register-form']} noValidate onSubmit={handleSubmit}>
            <div>
                <div className={styles['input-wrapper']}>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className={`${styles.input} ${showEmailError ? styles['invalid-input'] : ''}`}
                        placeholder=" "
                        required
                    />
                    <label htmlFor="email">
                        <span>E</span>
                        <span>m</span>
                        <span>a</span>
                        <span>i</span>
                        <span>l</span>
                    </label>
                    {showEmailError && <span className={styles['error-message']}>{emailError}</span>}
                </div>
            </div>

            <div>
                <div className={styles['input-wrapper']}>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={`${styles.input} ${showPasswordError ? styles['invalid-input'] : ''}`}
                        placeholder=" "
                        required
                    />
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
                    {password.length > 0 && (
                        <>
                            {showPasswordError && (
                                <span className={styles['error-message']}>{passwordError}</span>
                            )}
                            <div className={`${styles['strength-meter']} ${styles[strengthInfo.className]}`}>
                                {strengthInfo.message}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <button className={styles.button} type="submit">Register</button>
        </form>
        
    );
};

export default RegisterForm;