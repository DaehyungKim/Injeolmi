'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import { registerUser } from '../api/authApi';
import { StrengthInfo } from '../types';


// 이메일 정규식
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const useRegister = () => {

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

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

    return {
        email,
        emailError,
        password,
        passwordError,
        strengthInfo,
        showEmailError,
        showPasswordError,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit
    };

}