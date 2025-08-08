'use client';

import { useRegister } from '../hooks/useRegister';

export const RegisterForm = () => {
    const { email,
        emailError,
        password,
        passwordError,
        strengthInfo,
        showEmailError,
        showPasswordError,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit } = useRegister();

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
