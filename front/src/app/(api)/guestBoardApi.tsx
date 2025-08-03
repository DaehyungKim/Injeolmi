import axios from 'axios';
import { iCreate, iList, iUpdate } from '@/app/(type)/guest-board/board';
import { API_BOARD_ENDPOINT  } from './config';
import client from './client'; 

const PREFIX = API_BOARD_ENDPOINT + '/guest-board';


export const Create = async ( param : iCreate ) => {
    try {
        const response = await client.post(`${PREFIX}/create`, param);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error);
    }
    }
}

export const getList = async ( param: iList ) => {
    try {
        const response = await client.get(`${PREFIX}/list`, { params: param });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error);
    }
    }
}

export const getPost = async ( id: string ) => {
    try {

        const response = await client.get(`${PREFIX}/read/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error);
    }
    }
}

export const getPostForUpdate = async ( id: number, password: string ) => {
    try {
        const response = await client.post(`${PREFIX}/update/${id}`,  { password: password } );
        return response.data;
    } catch (error) {
        console.log("Error fetching post for update:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error);
    }
    }
}


export const updatePost = async  ( param : iUpdate ) => {
    try {
        const response = await client.put(`${PREFIX}/update/${param.id}`, param);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error);
    }
    }
}

export const deletePost = async ( id: number, password: string ) => {
    try {
        const response = await client.delete(`${PREFIX}/delete/${id}`, { data: { password: password } });
        return response.data;
    } catch (error) {
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.error);
    }
}
}

export const imageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await client.post(`${PREFIX}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error);
    }
    }
}