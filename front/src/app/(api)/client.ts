import axios, {InternalAxiosRequestConfig } from 'axios';
import { API_SERVER_HOST } from './config';
import { store } from '../(store)/store';
import { CSRFToken } from '../(store)/slice/authSlice';

const client = axios.create({
    baseURL: API_SERVER_HOST,
    withCredentials: true,    
});


// 요청 인터셉터 - csrf 토큰 헤더 추가
client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
            const csrfToken = store.getState().auth.csrfToken;
            if (csrfToken) {
                config.headers['X-CSRF-Token'] = csrfToken;
            }
        }
        return config;
        },
        (error) => {
            return Promise.reject(error);
        }
);

// 응답 인터셉터 - csrf 토큰 만료 처리

client.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if ((error.response?.status === 403 || error.response?.status === 419) && !originalRequest._retry) {

            originalRequest._retry = true;

            try {
                await store.dispatch(CSRFToken());

                const csrfToken = store.getState().auth.csrfToken;
                if (csrfToken) {
                    originalRequest.headers['X-CSRF-Token'] = csrfToken;
                }

                return client(originalRequest);
            } catch (error) {
                console.error('CSRF Token refresh failed:', error);
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
)


export default client;

