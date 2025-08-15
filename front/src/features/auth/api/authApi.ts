import client from '@/api/client';
import { Register } from '../types';
import axios from 'axios'; 

const PREFIX = '/api/auth'; 

export const registerUser = async (formData: Register) => {
    try {
        const response = await client.post(`${PREFIX}/register`, formData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

export const login = async (formData: Register) => {
    try {
        const response = await client.post(`${PREFIX}/login`, formData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await client.get(`${PREFIX}/me`);
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

export const logout = async () => {
    try {
        const response = await client.post(`${PREFIX}/logout`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

// export const refreshToken = async () => {
//     try
//     const response = await 
// }