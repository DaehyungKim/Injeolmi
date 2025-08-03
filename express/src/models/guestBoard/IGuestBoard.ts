import { IModel, IModelResponse } from '../common/types';

export interface ICreate extends IModel {
    title: string;
    author: string;
    password: string;
    content: string;
    preImages?: string[];
}

export interface IPost extends IModelResponse {
    title: string;
    author: string;
    content: string;
}

export interface IUpdate extends IModelResponse {
    title: string;
    author: string;
    content: string;
    preImages?: string[];
}

export interface IList {
    title?: string;
    page?: number;
    pageSize?: number;
    OTitle?: string;
    OAuthor?: string;
}

export interface IListResponse {
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
