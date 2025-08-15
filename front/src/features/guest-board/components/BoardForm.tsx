'use client';

import { EditorContent } from '@tiptap/react';

import { MenuBar } from './MenuBar';
import 'tiptap-extension-resizable-image/styles.css';
import type { GuestBoardFormProps } from '../types';
import { useBoardForm } from '../hooks/usdBoardForm';



export const BoardForm = (props: GuestBoardFormProps) => {
  const { submitButtonText, form, setForm, editor, addImage, addVideo, handleFormSubmit  } = useBoardForm(props);
  

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