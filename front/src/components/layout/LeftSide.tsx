import Link from 'next/link';
import { House, Send, Compass, Search, FolderPlus, Bell, LayoutGrid, UserRound, Pencil, Settings } from 'lucide-react';

const LeftSide = () => {
    return (
        
            <nav className="flex flex-col p-4 gap-4 bg-gray-50 w-[200px] gap-10">
                <h1 className="text-4xl mb-10">인절미</h1>
                <Link href="/"><House /></Link>
                <Link href="#"><Send /></Link>
                <Link href="#"><Compass /></Link>
                <Link href="#"><Search /></Link>
                <Link href="#"><FolderPlus /></Link>
                <Link href="#"><Bell /></Link>
                <Link href="#"><LayoutGrid /></Link>
                <Link href="#"><UserRound /></Link>
                <Link href="#"><Pencil /></Link>
                <Link href="#"><Settings /></Link>
                <Link href="/guest-board/list?page=1">버려질게시판</Link>
                <Link href="/auth/login">버려질로그인</Link>
                <Link href="/auth/register">버려질회원가입</Link>
            </nav>

    )
}

export default LeftSide;