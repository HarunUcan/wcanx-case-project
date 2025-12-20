'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '@/services/api';
import { jwtDecode } from 'jwt-decode';

type AuthUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
};

type AuthContextValue = {
    token: string | null;
    user: AuthUser | null;
    isAuthenticated: boolean;
    isReady: boolean; // localStorage okundu mu
    setToken: (token: string | null) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setTokenState] = useState<string | null>(null);
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isReady, setIsReady] = useState(false);

    const parseUserFromToken = (t: string): AuthUser | null => {
        try {
            const decoded = jwtDecode<any>(t);

            // JWT payload: { sub, email, firstName, lastName }
            if (!decoded?.sub || !decoded?.email) return null;

            return {
                id: decoded.sub,
                email: decoded.email,
                firstName: decoded.firstName ?? '',
                lastName: decoded.lastName ?? '',
            };
        } catch {
            return null;
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem('accessToken');
        if (saved) {
            setTokenState(saved);
            setUser(parseUserFromToken(saved));
        }
        setIsReady(true);
    }, []);

    const setToken = (newToken: string | null) => {
        setTokenState(newToken);

        if (newToken) {
            localStorage.setItem('accessToken', newToken);
            setUser(parseUserFromToken(newToken));
        } else {
            localStorage.removeItem('accessToken');
            setUser(null);
        }
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
            user,
            isAuthenticated: Boolean(token),
            isReady,
            setToken,
            logout,
        }),
        [token, user, isReady],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}