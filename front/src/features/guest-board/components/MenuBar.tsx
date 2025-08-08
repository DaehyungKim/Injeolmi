import type { Editor } from '@tiptap/react';
import { useEditorState } from '@tiptap/react';

export const MenuBar = ({ editor, addImage, addVideo }: { editor: Editor; addImage: () => void; addVideo: () => void }) => {
    const editorState = useEditorState({
        editor,
        selector: ctx => ({
            isBold: ctx.editor.isActive('bold'),
            canBold: ctx.editor.can().chain().focus().toggleBold().run(),
            isStrike: ctx.editor.isActive('strike'),
            canStrike: ctx.editor.can().chain().focus().toggleStrike().run(),
            isCode: ctx.editor.isActive('code'),
            canCode: ctx.editor.can().chain().focus().toggleCode().run(),
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
        }),
    });

    const Button = ({
        onClick,
        disabled,
        isActive,
        children,
    }: {
        onClick: () => void;
        disabled?: boolean;
        isActive?: boolean;
        children: React.ReactNode;
    }) => (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`
                px-3 py-2 border rounded text-sm transition-colors duration-200
                ${isActive
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }
                ${disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                }
            `}
        >
            {children}
        </button>
    );

    return (
        <div className="border border-gray-300 rounded-lg p-2.5 mb-2.5 bg-gray-50">
            <div className="flex flex-wrap gap-1.5">
                <Button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editorState.canBold} isActive={editorState.isBold}>Bold</Button>
                <Button onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editorState.canStrike} isActive={editorState.isStrike}>Strike</Button>
                <Button onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editorState.canCode} isActive={editorState.isCode}>Code</Button>
                <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>Clear marks</Button>
                <Button onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes</Button>
                <Button onClick={() => editor.chain().focus().setParagraph().run()} isActive={editorState.isParagraph}>Paragraph</Button>
                <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editorState.isHeading1}>H1</Button>
                <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editorState.isHeading2}>H2</Button>
                <Button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editorState.isHeading3}>H3</Button>
                <Button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} isActive={editorState.isHeading4}>H4</Button>
                <Button onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} isActive={editorState.isHeading5}>H5</Button>
                <Button onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} isActive={editorState.isHeading6}>H6</Button>
                <Button onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editorState.isBulletList}>Bullet list</Button>
                <Button onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editorState.isOrderedList}>Ordered list</Button>
                <Button onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editorState.isCodeBlock}>Code block</Button>
                <Button onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editorState.isBlockquote}>Blockquote</Button>
                <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>Horizontal rule</Button>
                <Button onClick={() => editor.chain().focus().setHardBreak().run()}>Hard break</Button>
                <Button onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}>Undo</Button>
                <Button onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}>Redo</Button>
                <Button onClick={addImage}>image</Button>
                <Button onClick={addVideo}>video</Button>
            </div>
        </div>
    );
};