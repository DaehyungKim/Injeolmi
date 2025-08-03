'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import MenuBar from '@/app/(common)/components/editor/MenuBar';
import { Create, imageUpload } from '@/app/(api)/guestBoardApi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Tiptap.module.css';
import StarterKit from '@tiptap/starter-kit';
import { ResizableImage } from 'tiptap-extension-resizable-image';
import 'tiptap-extension-resizable-image/styles.css';
import { iCreate } from '@/app/(type)/guest-board/board';

const API_SERVER_HOST = process.env.NEXT_PUBLIC_API_SERVER_HOST!;

const Tiptap = () => {
    const [form, setForm] = useState<iCreate>({ title: '', author: '', password: '', content: '', preImages: [] });
    const router = useRouter();
    const editor = useEditor({
        extensions: [StarterKit, ResizableImage.configure({
        defaultWidth: 200,
        defaultHeight: 200,
    }),],
        content: '<p>Hello World! 🌍</p>',
        immediatelyRender: false, // 렌더링 최적화를 위해 즉시 렌더링을 비활성화
    })
    if (!editor) {
        return null;
    }

    const handleSubmit = async () => {
        const content = editor.getHTML();
        if (!form.title || !form.author || !form.password || !content) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        try {
            const response = await Create({ ...form, content });
            console.log(response);
            alert('게시글이 작성되었습니다.');
            router.push(`/guest-board/read/${response}`);
        } catch (error) {
            alert(error instanceof Error ? error.message : '게시글 작성에 실패했습니다.');

        }
        
    }

    const addImage = async () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = async (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            
            if (file) {
                try {
                    const response = await imageUpload(file as File);
                    setForm((prev) => ({
                        ...prev,
                        preImages: [...prev.preImages, response.filePath],
                    }));
                    const imageUrl = API_SERVER_HOST + response.filePath;
                    editor.commands.setResizableImage({
                        src: imageUrl,
                        alt: '',
                        title: '',
                        width: 200,
                        height: 200,
                        className: '',
                        'data-keep-ratio': true,
                    });
                } catch (error) {
                    console.error('이미지 업로드 실패:', error);
                    alert(error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.');
                }
            }
        };
        fileInput.click();
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <p>제목</p>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="제목을 입력하세요"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                /> 
            </div>
            <div className={styles.author}>
                <p>작성자</p>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="작성자를 입력하세요"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
                <p>비밀번호</p>
                <input
                    type="password"
                    className={styles.input}
                    placeholder="비밀번호를 입력하세요"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
            </div>
        <MenuBar editor={editor} addImage={addImage}  />
        
        <EditorContent editor={editor} className={styles.tiptap} />
        <button className={styles.create} onClick={handleSubmit}>
            글작성
        </button>
    </div>

    )
    
}

export default Tiptap;