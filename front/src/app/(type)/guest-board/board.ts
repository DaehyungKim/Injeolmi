export interface iBoardItem {
    id: number;
    title: string;
    author: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface iCreate {
    title: string;
    content: string;
    author: string;
    password: string;
    preImages: string[];
}

export interface iUpdate {
    id: number;
    title: string;
    content: string;
    author: string;
    preImages: string[];
    createdAt: string;
    updatedAt?: string;
}

export const initialIUpdate: iUpdate ={
    id: 0,
    title: '',
    content: '',
    author: '',
    preImages: [],
    createdAt: '',
    updatedAt: '',
}


export interface iList {
    page: number;
    pageSize: number;
    OTitle: string;
    OAuthor: string;
}

export interface iBoardListProps {
    list: iBoardItem[];
    page: number;
    lastPage: number;
}

export interface iDetailProps {
    detail: iBoardItem;
}