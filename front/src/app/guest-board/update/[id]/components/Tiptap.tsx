'use client';


import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from '@/app/(common)/components/editor/MenuBar';
import { updatePost, getPostForUpdate } from '@/app/(api)/guestBoardApi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./Tiptap.module.css";
import { imageUpload } from '@/app/(api)/guestBoardApi';
import { ResizableImage } from 'tiptap-extension-resizable-image';
import 'tiptap-extension-resizable-image/styles.css';
import { iUpdate, initialIUpdate } from '@/app/(type)/guest-board/board';
import Modal from '@/app/(common)/components/ui/Modal';




const API_SERVER_HOST = process.env.NEXT_PUBLIC_API_SERVER_HOST!;

const Tiptap = ( {id}: {id:string}) => {
    const router = useRouter();
    const [form, setForm] = useState<iUpdate>(initialIUpdate);
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const loadPost = async () => {
        if (!password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        
        try {
            const response = await getPostForUpdate(Number(id), password);
            setForm({
                id: response.id,
                title: response.title,
                content: response.content,
                author: response.author,
                createdAt: response.createdAt,
                updatedAt: response.updatedAt,
                preImages: response.preImages || [],
            });
            setIsAuth(true);
            setShowModal(false);
        } catch (error) {
            alert(error instanceof Error ? error.message : '비밀번호가 일치하지 않습니다.');
        }
    };


    
    const editor = useEditor({
        extensions: [StarterKit, ResizableImage.configure({
        defaultWidth: 200,
        defaultHeight: 200,
    }),],
        immediatelyRender: false, // 렌더링 최적화를 위해 즉시 렌더링을 비활성화
    })
    
    useEffect(() => {
        if (editor && form.content && isAuth) {
            Promise.resolve().then(() => {
                editor.commands.setContent(form.content);
                console.log(form);
            })
            
        }
    }, [editor, form.content]);

    if (showModal) {
        return (
            <Modal
                password={password}
                setPassword={setPassword}
                onConfirm={() => {
                    loadPost();
                }}
                onCancel={() => {
                    setPassword("");
                    setShowModal(false);
                    router.push('/guest-board/read/' + id); 
                }}
            />
        );
    }

    if (!editor || !form.content) {
        return null;
    }

    const handleSubmit = async () => {
        const content = editor.getHTML();
        if (!form.title || !form.author ||  !content) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        try {
            const response = await updatePost({ ...form, content });
            console.log(response);
            alert('게시글이 수정되었습니다.');
            router.push(`/guest-board/read/${String(response)}`);
        } catch (error) {
            alert(error instanceof Error ? error.message : '게시글을 수정하는데 실패했습니다.');
        }
        
    }

    const addImage = async () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.onchange = async (event) => {
                const file = (event.target as HTMLInputElement).files?.[0];
                
                if (file) {
                    const response = await imageUpload(file as File);
                    setForm((prev) => ({
                        ...prev,
                        preImages: [...prev.preImages, response.filePath],
                    }))
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
                    className="border p-2 w-full mb-4"
                    placeholder="제목을 입력하세요"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                /> 
            </div>
            <div className={styles.author}>
                <p>작성자</p>
                <input
                    type="text"
                    className="border p-2 w-full mb-4"
                    placeholder="작성자를 입력하세요"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
            </div>
        <MenuBar editor={editor} addImage={addImage} />
        
        <EditorContent editor={editor} className={styles.tiptap} />
        <button className={styles.create} onClick={handleSubmit}>
            글수정
        </button>
    </div>

    )
    
}

export default Tiptap;