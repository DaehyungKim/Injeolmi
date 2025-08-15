import { Model, ModelResponse } from "@src/core/shared/type";

export type Create = Model & {
    title: string;
    author: string;
    password: string;
    content: string;
    preImages?: string[];
}

export type Post = ModelResponse & {
    title: string;
    author: string;
    content: string;
}

export type Update = ModelResponse & {
    title: string;
    author: string;
    content: string;
    preImages?: string[];
}

export type List = {
    title?: string;
    page?: number;
    pageSize?: number;
    OTitle?: string;
    OAuthor?: string;
}

export type ListResponse = {
    items: {
        id: number;
        title: string;
        author: string;
        createdAt: string;
    }[];
    total: number;
    page: number;
    pageSize: number;
}