'use client';

import { useEditor } from '@tiptap/react';
import { useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { ResizableImage } from 'tiptap-extension-resizable-image';
import { imageUpload } from '../api/boardApi';
import 'tiptap-extension-resizable-image/styles.css';
import type { Create, Update, GuestBoardFormProps } from '../types';
import { Video } from '../utils/video';





export const useBoardForm = (props: GuestBoardFormProps) => {
    const { submitButtonText } = props;

    const [form, setForm] = useState<Create | Update>(
        props.mode === 'update' ? props.initialData : { title: '', author: '', password: '', content: '', preImages: [] }
    );


    const editor = useEditor({
        extensions: [StarterKit, ResizableImage.configure({ defaultWidth: 200, defaultHeight: 200, maxWidth: 730 }), Video],
        content: props.mode === 'update' ? props.initialData.content : '',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose max-w-none focus:outline-none p-4 min-h-[500px] bg-white',
            },
        },
        onUpdate: ({ editor }) => {
            setForm(prev => ({ ...prev, content: editor.getHTML() }));
        },
    });

    const addImage = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = async (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file && editor) {
                try {
                    const response = await imageUpload(file);
                    console.log('이미지 업로드 성공:', response);
                    setForm(prev => ({ ...prev, preImages: [...(prev.preImages || []), response.s3FileUrl] }));
                    editor.chain().focus().setResizableImage({ src: response.s3FileUrl, width: 200, height: 200, 'data-keep-ratio': true }).run();
                } catch (error) {
                    console.error('Image upload failed:', error);
                    alert(error instanceof Error ? error.message : '이미지 업로드 실패');
                }
            }
        };
        fileInput.click();
    };

    const addVideo = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'video/*';
        fileInput.onchange = async (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file && editor) {
                try {
                    const response = await imageUpload(file);
                    setForm(prev => ({ ...prev, preImages: [...(prev.preImages || []), response.s3FileUrl] }));
                    console.log('비디오 업로드 성공:' + form.preImages);
                    editor?.commands.setVideo(response.s3FileUrl);
                } catch (error) {
                    console.error('Video upload failed:', error);
                    alert(error instanceof Error ? error.message : '비디오 업로드 실패');
                }
            }
        };
        fileInput.click();
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', form);

        if (props.mode === 'create') {
            if (!form.title || !form.author || !('password' in form && form.password) || !form.content) {
                alert('모든 필드를 입력해주세요.');
                return;
            }
            props.onSubmit(form as Create);
        } else {
            if (!form.title || !form.content) {
                alert('모든 필드를 입력해주세요.');
                return;
            }
            props.onSubmit(form as Update);
        }
    };

    return {
        submitButtonText, form, setForm, editor, addVideo, addImage, handleFormSubmit
    }

}