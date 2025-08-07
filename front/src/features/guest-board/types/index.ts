export interface iBoardItem {
    id: number;
    title: string;
    author: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface iBoardListInitialProps {
    initialList: iBoardItem[];
    initialPage: number;
    initialLastPage: number;
}

export interface iCreate {
    title: string;
    content: string;
    author: string;
    password: string;
    preImages: string[];
}

export interface iPaginationProps {
    currentPage: number;
    lastPage: number;
    basePath: string;
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

export type CreateFormProps = {
    mode: 'create';
    onSubmit: (data: iCreate) => Promise<void>;
    submitButtonText: string;
};

export type UpdateFormProps = {
    mode: 'update';
    initialData: iUpdate;
    onSubmit: (data: iUpdate) => Promise<void>;
    submitButtonText: string;
};


export type GuestBoardFormProps = CreateFormProps | UpdateFormProps;