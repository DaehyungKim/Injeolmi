import axios from 'axios';
import { API_SERVER_HOST } from './config';
import { store } from '@/store/store';

const baseURL = typeof window === 'undefined' ? API_SERVER_HOST : '';
const CSRF_TOKEN_URL = '/api/auth/csrf-token';



const client = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

const isMutation = (method?: string) => {
    return ['post', 'put', 'patch', 'delete'].includes(method?.toLowerCase() || '');
}

client.interceptors.request.use(async (config) => {
    console.log('Request interceptor 실행:', typeof window === 'undefined' ? 'SERVER' : 'CLIENT');

    if (config.url === CSRF_TOKEN_URL) {
        return config;
    }

    let csrfToken: string | undefined | null;

    if (typeof window === 'undefined') {
        try {
            const { cookies } = await import('next/headers');
            const cookieStore = await cookies();
            config.headers.Cookie = cookieStore.toString();

            csrfToken = cookieStore.get('x-csrf-token')?.value;
            
        } catch (error) {
            console.log('서버: 쿠키 설정 실패', error);
        }
    } else {
        csrfToken = store.getState().auth.csrfToken;
    }

    if (isMutation(config.method) && csrfToken) {
        console.log(`[${typeof window === 'undefined' ? 'SERVER' : 'CLIENT'}] CSRF 토큰 추가:`, csrfToken);
        config.headers['x-csrf-token'] = csrfToken;
    }
    return config;
});


export default client;