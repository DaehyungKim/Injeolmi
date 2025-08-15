'use client'

import { useAuth } from "../hooks/useAuth"

export const Logout = () => {
    const { handleLogout } = useAuth();

    return (
        <button className="cursor-pointer" onClick={handleLogout}>로그아웃</button>
    )
    

}