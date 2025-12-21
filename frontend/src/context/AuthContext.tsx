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
    refreshToken: string | null;
    user: AuthUser | null;
    isAuthenticated: boolean;
    isReady: boolean; // localStorage okundu mu
    setAuthToken: (tokens: { accessToken: string; refreshToken: string } | null) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setTokenState] = useState<string | null>(null);
    const [refreshToken, setRefreshTokenState] = useState<string | null>(null);
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isReady, setIsReady] = useState(false);

    const parseUserFromToken = (t: string): AuthUser | null => {
        try {
            const decoded = jwtDecode<any>(t);
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
        const savedToken = localStorage.getItem('accessToken');
        const savedRefreshToken = localStorage.getItem('refreshToken');
        if (savedToken && savedRefreshToken) {
            setTokenState(savedToken);
            setRefreshTokenState(savedRefreshToken);
            setUser(parseUserFromToken(savedToken));
        }
        setIsReady(true);
    }, []);

    const setAuthToken = (tokens: { accessToken: string; refreshToken: string } | null) => {
        if (tokens) {
            setTokenState(tokens.accessToken);
            setRefreshTokenState(tokens.refreshToken);
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            setUser(parseUserFromToken(tokens.accessToken));
        } else {
            setTokenState(null);
            setRefreshTokenState(null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setUser(null);
        }
    };

    const logout = () => {
        // We assume usage of logout is just clearing state, actual API call is done elsewhere or we can add it here.
        // But for context consistency we just clear state.
        setAuthToken(null);
    };

    useEffect(() => {
        const handleLogout = () => setAuthToken(null);
        const handleUpdate = () => {
            const t = localStorage.getItem('accessToken');
            const rt = localStorage.getItem('refreshToken');
            if (t && rt) {
                setAuthToken({ accessToken: t, refreshToken: rt });
            }
        };

        window.addEventListener('auth:logout', handleLogout);
        window.addEventListener('auth:update', handleUpdate);

        return () => {
            window.removeEventListener('auth:logout', handleLogout);
            window.removeEventListener('auth:update', handleUpdate);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = useMemo(
        () => ({
            token,
            refreshToken,
            user,
            isAuthenticated: Boolean(token),
            isReady,
            setAuthToken,
            logout,
        }),
        [token, refreshToken, user, isReady],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}