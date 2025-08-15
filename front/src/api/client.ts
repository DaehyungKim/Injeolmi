import axios, { InternalAxiosRequestConfig } from 'axios';
import { API_SERVER_HOST } from './config';

const baseURL = typeof window === 'undefined' ? API_SERVER_HOST : '';

const client = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

client.interceptors.request.use(async (config) => {
    console.log('Request interceptor 실행:', typeof window === 'undefined' ? 'SERVER' : 'CLIENT');
    
    if (typeof window === 'undefined') {
        try {
            const { cookies } = await import('next/headers');
            const cookieStore = await cookies();
            config.headers.Cookie = cookieStore.toString();
            console.log('서버: 쿠키 설정 완료');
        } catch (error) {
            console.log('서버: 쿠키 설정 실패', error);
        }
    }
    return config;
});

let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];


const onRefreshed = () => {
    subscribers.forEach(callback => callback('refreshed'));
    subscribers = [];
};


const addSubscriber = (callback: (token: string) => void) => {
    subscribers.push(callback);
};


client.interceptors.response.use(
    (response) => response,
    async (error) => {
        
        const request = error.config;

        if (error.response?.status === 401 && !request._retry) {
            const errorMessage = error.response?.data?.error;
            console.log('401 에러 메시지:', errorMessage); // 디버그용

            if (errorMessage === 'TOKEN_EXPIRED' || errorMessage === 'EMPTY_TOKEN') {
                
                if (isRefreshing) {
                    return new Promise((resolve) => {
                        addSubscriber(() => {
                            resolve(client(request));
                        });
                    });
                }

                request._retry = true;
                isRefreshing = true;

                try {
                    if (typeof window === 'undefined') {
                        console.log("되냐???????????????????????????????????")
                        // const { cookies } = await import('next/headers');
                        // const cookieStore = await cookies();
                        
                        // const response = await fetch(`${API_SERVER_HOST}/api/auth/refresh`, {
                        //     method: 'POST',
                        //     headers: {
                        //         'Cookie': cookieStore.toString(),
                        //     },
                        //     credentials: 'include',
                        // });

                        // if (!response.ok) throw new Error('Refresh failed');
                    } else {
                        // 클라이언트에서 리프레시
                        await client.post('/api/auth/refresh');
                    }
                    
                    // isRefreshing = false;
                    // onRefreshed();
                    // return client(request);

                } catch (err) {
                    isRefreshing = false;
                    subscribers = [];

                    if (typeof window === 'undefined') {
                        throw error;
                    } else {
                        window.location.href = '/login';
                    }
                    return Promise.reject(err);
                }
            }
        }

        return Promise.reject(error);
    }
);



// client.interceptors.response.use(
//     (response) => {
//         console.log('Response interceptor 성공:', response.status);
//         return response;
//     },
//     async (error) => {
//         console.log('Response interceptor 에러 발생:', {
//             환경: typeof window === 'undefined' ? 'SERVER' : 'CLIENT',
//             상태코드: error.response?.status,
//             에러데이터: error.response?.data,
//             에러메시지: error.response?.data?.error
//         });
        
//         return Promise.reject(error);
//     }
// );

export default client;