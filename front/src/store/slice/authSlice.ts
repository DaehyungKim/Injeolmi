import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser, logout } from '@/features/auth/api/authApi';


interface AuthState {
    user: any;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};


export const loginUser = createAsyncThunk('auth/checkAuth', async () => {
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
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = !!action.payload;
            })
            .addCase(loginUser.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
        },
    });

export const { setUser } = authSlice.actions;
export default authSlice.reducer;