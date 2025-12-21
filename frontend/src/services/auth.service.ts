import { api } from './api';

export type RegisterRequest = { email: string; password: string; firstName: string; lastName: string; };
export type LoginRequest = { email: string; password: string; };
export type LoginResponse = { accessToken: string; refreshToken: string; };
export type RegisterResponse = { id: string; email: string; firstName: string; lastName: string; };

export const authService = {
    async register(data: RegisterRequest) {
        const res = await api.post<RegisterResponse>('/auth/register', data);
        return res.data;
    },
    async login(data: LoginRequest) {
        const res = await api.post<LoginResponse>('/auth/login', data);
        return res.data;
    },

    async refreshToken(token: string) {
        const res = await api.post<LoginResponse>('/auth/refresh', { refreshToken: token });
        return res.data;
    },

    async logout() {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            // ignore error
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },

};
