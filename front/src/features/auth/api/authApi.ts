import client from '@/api/client';
import { iRegister } from '@/type/auth/auth';
import axios from 'axios'; 

const PREFIX = '/api/auth';  // Express의 /api 경로에 맞춤

export const registerUser = async (formData: iRegister) => {
    try {
        const response = await client.post(`${PREFIX}/register`, formData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

export const login = async (formData: { email: string; password: string }) => {
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

// export const getCSRFToken = async () => {
//     try {
//         const response = await client.get(`${PREFIX}/csrf-token`);
//         return response.data;
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             throw new Error(error.response?.data.error);
//         }
//     }
// }