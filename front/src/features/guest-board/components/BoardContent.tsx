'use client';

import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { memo } from 'react';


export const BoardContent = memo(({ content }: { content: string }) => {
    const [sanitizedContent, setSanitizedContent] = useState('');

    useEffect(() => {

        setSanitizedContent(DOMPurify.sanitize(content));
    }, [content]);


    return <div className="tiptap" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
});