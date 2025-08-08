import Link from 'next/link';

const LeftSide = () => {
    return (
        
            <nav className="flex flex-col p-4 gap-4 bg-gray-50 w-[200px]">
                <h1 className="text-4xl mb-10">인절미</h1>
                <Link href="/">홈</Link>
                <Link href="#">메세지</Link>
                <Link href="#">탐색</Link>
                <Link href="#">검색</Link>
                <Link href="#">그룹</Link>
                <Link href="#">알람</Link>
                <Link href="#">설정</Link>
                <Link href="#">프로필</Link>
                <Link href="#">작성</Link>
                <Link href="#">설정</Link>
                <Link href="/guest-board/list?page=1">버려질게시판</Link>
                <Link href="/auth/login">버려질로그인</Link>
                <Link href="/auth/register">버려질회원가입</Link>
            </nav>

    )
}

export default LeftSide;