export type BoardItem = {
    id: number;
    title: string;
    author: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export type BoardListInitialProps = {
    initialList: BoardItem[];
    initialPage: number;
    initialLastPage: number;
}

export type Create = {
    title: string;
    content: string;
    author: string;
    password: string;
    preImages: string[];
}

export type PaginationProps = {
    currentPage: number;
    lastPage: number;
    basePath: string;
}

export type Update = {
    id: number;
    title: string;
    content: string;
    author: string;
    preImages: string[];
    createdAt: string;
    updatedAt?: string;
}


export type List = {
    page: number;
    pageSize: number;
    OTitle: string;
    OAuthor: string;
}


export type ReadPageProps = {
    params: { id: string };
}

export type CreateFormProps = {
    mode: 'create';
    onSubmit: (data: Create) => Promise<void>;
    submitButtonText: string;
};

export type UpdateFormProps = {
    mode: 'update';
    initialData: Update;
    onSubmit: (data: Update) => Promise<void>;
    submitButtonText: string;
};


export type GuestBoardFormProps = CreateFormProps | UpdateFormProps;