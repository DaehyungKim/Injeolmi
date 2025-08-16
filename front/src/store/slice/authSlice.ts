import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { login, logout, getCSRFToken, getCurrentUser } from '@/features/auth/api/authApi';

type User = {
    email: string;
    
};

type AuthInfo = {
    email: string;
    password: string;
};

type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    csrfToken: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    csrfToken: null,
    status: 'idle',
};


export const loginUser = createAsyncThunk<User, AuthInfo>('auth/login', async (info) => {
    const user = await login(info);
    return user;
})

export const checkAuth = createAsyncThunk<User, void>('auth/checkAuth', async() => {
    return await getCurrentUser();
})

export const CSRFToken = createAsyncThunk('/auth/csrfToken', async () => {
    const token = await getCSRFToken();
    return token;
})

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
    try {
        await logout();
    } catch(error) {

    } finally {
        dispatch(CSRFToken());
    }
});


// 리듀서 함수
const handleAuthPending = (state: AuthState) => {
    state.status = 'loading';
};

const handleAuthSuccess = (state: AuthState, action: PayloadAction<User>) => {
    state.status = 'succeeded';
    state.isAuthenticated = true;
    state.user = action.payload;
};

const handleAuthFailure = (state: AuthState) => {
    state.status = 'failed';
    state.isAuthenticated = false;
    state.user = null;
};
//



const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
           // --- checkAuth Thunk ---
            .addCase(checkAuth.pending, handleAuthPending)
            .addCase(checkAuth.fulfilled, handleAuthSuccess)
            .addCase(checkAuth.rejected, handleAuthFailure)

            // --- loginUser Thunk ---
            .addCase(loginUser.pending, handleAuthPending) 
            .addCase(loginUser.fulfilled, handleAuthSuccess)
            .addCase(loginUser.rejected, handleAuthFailure)

            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.csrfToken = null;
            })
            .addCase(CSRFToken.fulfilled, (state, action) => {
                console.log('CSRF Token fetched:', action.payload);
                state.csrfToken = action.payload.csrfToken;
            })
        },
    });

export const { setUser } = authSlice.actions;
export default authSlice.reducer;