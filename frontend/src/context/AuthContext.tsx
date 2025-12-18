'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '@/services/api';

type AuthContextValue = {
    token: string | null;
    isAuthenticated: boolean;
    isReady: boolean; // localStorage okundu mu
    setToken: (token: string | null) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setTokenState] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('accessToken');
        if (saved) setTokenState(saved);
        setIsReady(true);
    }, []);

    const setToken = (newToken: string | null) => {
        setTokenState(newToken);
        if (newToken) localStorage.setItem('accessToken', newToken);
        else localStorage.removeItem('accessToken');
    };

    const logout = () => setToken(null);

    useEffect(() => {
        const id = api.interceptors.response.use(
            (res) => res,
            (err) => {
                if (err?.response?.status === 401) logout();
                return Promise.reject(err);
            },
        );
        return () => api.interceptors.response.eject(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = useMemo(
        () => ({
            token,
            isAuthenticated: Boolean(token),
            isReady,
            setToken,
            logout,
        }),
        [token, isReady],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
