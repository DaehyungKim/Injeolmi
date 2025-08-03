import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser, logout, getCSRFToken } from '@/app/(api)/authApi';


interface AuthState {
    user: any;
    isLoading: boolean;
    isAuthenticated: boolean;
    csrfToken: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    csrfToken: null,
};

export const CSRFToken = createAsyncThunk('/auth/csrfToken', async () => {
    const token = await getCSRFToken();
    return token;
})

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
    const user = await getCurrentUser();
    return user;
})

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    await logout();
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = !!action.payload;
                state.isLoading = false;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(CSRFToken.fulfilled, (state, action) => {
                console.log('CSRF Token fetched:', action.payload);
                state.csrfToken = action.payload.csrfToken;
            })
        },
    });

export const { setUser } = authSlice.actions;
export default authSlice.reducer;