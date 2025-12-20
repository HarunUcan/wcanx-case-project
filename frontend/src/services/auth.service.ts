import { api } from './api';

export type RegisterRequest = { email: string; password: string };
export type LoginRequest = { email: string; password: string };
export type LoginResponse = { accessToken: string };
export type RegisterResponse = { id: string; email: string };

export const authService = {
    async register(data: RegisterRequest) {
        const res = await api.post<RegisterResponse>('/auth/register', data);
        return res.data;
    },
    async login(data: LoginRequest) {
        const res = await api.post<LoginResponse>('/auth/login', data);
        return res.data;
    },

    logout() {
        localStorage.removeItem('accessToken');
    },

};
