import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react';

export const MenuBar = ({ editor, addImage }: { editor: Editor, addImage: () => void }) => {
    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx.editor.isActive('bold'),
                canBold: ctx.editor.can().chain().focus().toggleBold().run(),
                isItalic: ctx.editor.isActive('italic'),
                canItalic: ctx.editor.can().chain().focus().toggleItalic().run(),
                isStrike: ctx.editor.isActive('strike'),
                canStrike: ctx.editor.can().chain().focus().toggleStrike().run(),
                isCode: ctx.editor.isActive('code'),
                canCode: ctx.editor.can().chain().focus().toggleCode().run(),
                canClearMarks: ctx.editor.can().chain().focus().unsetAllMarks().run(),
                isParagraph: ctx.editor.isActive('paragraph'),
                isHeading1: ctx.editor.isActive('heading', { level: 1 }),
                isHeading2: ctx.editor.isActive('heading', { level: 2 }),
                isHeading3: ctx.editor.isActive('heading', { level: 3 }),
                isHeading4: ctx.editor.isActive('heading', { level: 4 }),
                isHeading5: ctx.editor.isActive('heading', { level: 5 }),
                isHeading6: ctx.editor.isActive('heading', { level: 6 }),
                isBulletList: ctx.editor.isActive('bulletList'),
                isOrderedList: ctx.editor.isActive('orderedList'),
                isCodeBlock: ctx.editor.isActive('codeBlock'),
                isBlockquote: ctx.editor.isActive('blockquote'),
                canUndo: ctx.editor.can().chain().focus().undo().run(),
                canRedo: ctx.editor.can().chain().focus().redo().run(),
            }
        },
    })

    return (
        <div className="border border-gray-300 rounded-lg p-2.5 mb-2.5 bg-gray-50">
            <div className="flex flex-wrap gap-1.5">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editorState.canBold}
                    className={`px-3 py-2 border border-gray-300 rounded text-sm transition-all duration-200 cursor-pointer ${
                        editorState.isBold 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white hover:bg-gray-100'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    Bold
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editorState.canStrike}
                    className={`px-3 py-2 border border-gray-300 rounded text-sm transition-all duration-200 cursor-pointer ${
                        editorState.isStrike 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white hover:bg-gray-100'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    Strike
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editorState.canCode}
                    className={`px-3 py-2 border border-gray-300 rounded text-sm transition-all duration-200 cursor-pointer ${
                        editorState.isCode 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white hover:bg-gray-100'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    Code
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                    className="px-3 py-2 border border-gray-300 rounded bg-white text-sm transition-all duration-200 cursor-pointer hover:bg-gray-100"
                >
                    Clear marks
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().clearNodes().run()}
                    className="px-3 py-2 border border-gray-300 rounded bg-white text-sm transition-all duration-200 cursor-pointer hover:bg-gray-100"
                >
                    Clear nodes
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`px-3 py-2 border border-gray-300 rounded text-sm transition-all duration-200 cursor-pointer ${
                        editorState.isParagraph 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    Paragraph
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-3 py-2 border border-gray-300 rounded text-sm transition-all duration-200 cursor-pointer ${
                        editorState.isHeading1 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    H1
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-3 py-2 border border-gray-300 rounded text-sm transition-all duration-200 cursor-pointer ${
                        editorState.isHeading2 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-3 py-2 border border-gray-300 rounded text-sm transition-all duration-200 cursor-pointer ${
                        editorState.isHeading3 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    H3
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={`px-3 py-2 border border-gray-300 rounded text-sm transition-all duration-200 cursor-pointer ${
                        editorState.isHeading4 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    H4
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={`px-3 py-2 border border-gray-300 rounded text-sm transition-all duration-200 cursor-pointer ${
                        editorState.isHeading5 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    H5
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={`px-3 py-2 border border-gray-300 rounded text-sm transition-all duration-200 cursor-pointer ${
                        editorState.isHeading6 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    H6
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-3 py-2 border border-gray-300 rounded text-sm transition-all duration-200 cursor-pointer ${
                        editorState.isBulletList 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    Bullet list
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-3 py-2 border border-gray-300 rounded text-sm transition-all duration-200 cursor-pointer ${
                        editorState.isOrderedList 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    Ordered list
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`px-3 py-2 border border-gray-300 rounded text-sm transition-all duration-200 cursor-pointer ${
                        editorState.isCodeBlock 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    Code block
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`px-3 py-2 border border-gray-300 rounded text-sm transition-all duration-200 cursor-pointer ${
                        editorState.isBlockquote 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    Blockquote
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className="px-3 py-2 border border-gray-300 rounded bg-white text-sm transition-all duration-200 cursor-pointer hover:bg-gray-100"
                >
                    Horizontal rule
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                    className="px-3 py-2 border border-gray-300 rounded bg-white text-sm transition-all duration-200 cursor-pointer hover:bg-gray-100"
                >
                    Hard break
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editorState.canUndo}
                    className="px-3 py-2 border border-gray-300 rounded bg-white text-sm transition-all duration-200 cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Undo
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editorState.canRedo}
                    className="px-3 py-2 border border-gray-300 rounded bg-white text-sm transition-all duration-200 cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Redo
                </button>
                <button
                    type="button"
                    onClick={addImage}
                    className="px-3 py-2 border border-gray-300 rounded bg-white text-sm transition-all duration-200 cursor-pointer hover:bg-gray-100"
                >
                    Image
                </button>
            </div>
        </div>
    )
}