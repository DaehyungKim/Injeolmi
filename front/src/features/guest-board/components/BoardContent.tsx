'use client';

import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';


export const BoardContent = ({ content }: { content: string }) => {
    const [sanitizedContent, setSanitizedContent] = useState('');

    useEffect(() => {

        setSanitizedContent(DOMPurify.sanitize(content));
    }, [content]);


    return <div className="tiptap" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};