'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function Protected({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isReady } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // önce localStorage okunur
        if (!isReady) return;

        if (!isAuthenticated) router.replace('/login');
    }, [isAuthenticated, isReady, router]);

    if (!isReady) return null;

    if (!isAuthenticated) return null;

    return <>{children}</>;
}
