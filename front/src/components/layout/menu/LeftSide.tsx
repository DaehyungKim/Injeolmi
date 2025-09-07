import Link from 'next/link';
import { House, Send, Compass, Search, FolderPlus, Bell, LayoutGrid, UserRound, Pencil, Settings } from 'lucide-react';
import { Logout } from "@/features/auth" 

export const LeftSide = () => {
    return (
        
            <nav className="flex flex-col items-start p-4 gap-10 bg-gray-50 w-[200px] ">
                <h1 className="text-4xl mb-10">인절미</h1>
                <Link href="/"><House /></Link>
                <Link href="/chat"><Send /></Link>
                <Link href="#"><Compass /></Link>
                <Link href="#"><Search /></Link>
                <Link href="#"><FolderPlus /></Link>
                <Link href="#"><Bell /></Link>
                <Link href="#"><LayoutGrid /></Link>
                <Link href="#"><UserRound /></Link>
                <Link href="#"><Pencil /></Link>
                <Link href="#"><Settings /></Link>
                <Link href="/guest-board/list?page=1">버려질게시판</Link>
                <Logout />
            </nav>

    )
}
