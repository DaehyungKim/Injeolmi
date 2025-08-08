'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { ResizableImage } from 'tiptap-extension-resizable-image';
import { imageUpload } from '../api/boardApi';
import { MenuBar } from './MenuBar';
import 'tiptap-extension-resizable-image/styles.css';
import type { iCreate, iUpdate, GuestBoardFormProps } from '../types';
import { Video } from '../utils/video';


const API_SERVER_HOST = process.env.NEXT_PUBLIC_API_SERVER_HOST!;

export const BoardForm = (props: GuestBoardFormProps) => {
  const { submitButtonText } = props;

  const [form, setForm] = useState<iCreate | iUpdate>(
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
          setForm(prev => ({ ...prev, preImages: [...(prev.preImages || []), response.filePath] }));
          const imageUrl = API_SERVER_HOST + response.filePath;
          editor.chain().focus().setResizableImage({ src: imageUrl, width: 200, height: 200, 'data-keep-ratio': true }).run();
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
          setForm(prev => ({ ...prev, preImages: [...(prev.preImages || []), response.filePath] }));
          const imageUrl = API_SERVER_HOST + response.filePath;
          editor?.commands.setVideo(imageUrl);
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
    
    if (props.mode === 'create') {
      if (!form.title || !form.author || !('password' in form && form.password) || !form.content) {
        alert('모든 필드를 입력해주세요.');
        return;
      }
      props.onSubmit(form as iCreate);
    } else {
      if (!form.title || !form.content) {
        alert('모든 필드를 입력해주세요.');
        return;
      }
      props.onSubmit(form as iUpdate);
    }
  };

  if (!editor) return null;

  const baseInputStyles = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow";
  const readOnlyInputStyles = "bg-gray-100 cursor-not-allowed";

  return (
    <form className="w-full max-w-[795px] mx-auto p-5" onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label className="block mb-1.5 font-semibold text-gray-700">제목</label>
        <input
          type="text"
          className={baseInputStyles}
          placeholder="제목을 입력하세요"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 mb-4">
        <div className="mb-4 md:mb-0">
          <label className="block mb-1.5 font-semibold text-gray-700">작성자</label>
          <input
            type="text"
            className={`${baseInputStyles} ${props.mode === 'update' ? readOnlyInputStyles : ''}`}
            placeholder="작성자를 입력하세요"
            value={form.author}
            readOnly={props.mode === 'update'}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
        </div>
        {props.mode === 'create' && 'password' in form && (
          <div>
            <label className="block mb-1.5 font-semibold text-gray-700">비밀번호</label>
            <input
              type="password"
              className={baseInputStyles}
              placeholder="비밀번호를 입력하세요"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        )}
      </div>

      <MenuBar editor={editor} addImage={addImage} addVideo={addVideo} />
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <EditorContent editor={editor} />
      </div>

      <button
        type="submit"
        className="block w-full sm:w-auto mx-auto mt-5 px-8 py-2.5 bg-blue-600 text-white font-bold rounded-md cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        {submitButtonText}
      </button>
    </form>
  );
};