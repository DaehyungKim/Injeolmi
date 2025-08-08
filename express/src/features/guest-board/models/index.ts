import { IModel, IModelResponse } from "@src/core/shared/models";

export interface iCreate extends IModel {
    title: string;
    author: string;
    password: string;
    content: string;
    preImages?: string[];
}

export interface iPost extends IModelResponse {
    title: string;
    author: string;
    content: string;
}

export interface iUpdate extends IModelResponse {
    title: string;
    author: string;
    content: string;
    preImages?: string[];
}

export interface iList {
    title?: string;
    page?: number;
    pageSize?: number;
    OTitle?: string;
    OAuthor?: string;
}

export interface iListResponse {
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