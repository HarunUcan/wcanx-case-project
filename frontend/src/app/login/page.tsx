'use client';

import AuthHeader from '@/components/auth/AuthHeader';
import AuthSwitch from '@/components/auth/AuthSwitch';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/context/AuthContext';

function LoginPage() {
    const router = useRouter();
    const { setToken, isAuthenticated, isReady } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isReady) return;
        if (isAuthenticated) router.replace('/dashboard');
    }, [isAuthenticated, isReady, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const form = e.currentTarget;
            const fd = new FormData(form);

            const email = String(fd.get('email') ?? '').trim();
            const password = String(fd.get('password') ?? '');

            console.log(email, " ", password)

            if (!email || !password) {
                setError('E-posta ve şifre zorunludur.');
                return;
            }

            const res = await authService.login({ email, password });
            setToken(res.accessToken);
            router.replace('/dashboard');
        } catch (err: any) {
            setError(err?.response?.data?.message ?? 'Giriş başarısız. Bilgilerinizi kontrol edin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <AuthHeader name="Tekrar Hoşgeldiniz" color="green" />

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <Input
                        id="email"
                        type="email"
                        name="E-Posta"
                        required
                        autoComplete="email"
                        className=""
                        placeHolderName="ex@example.com"
                    />

                    <Input
                        id="password"
                        type="password"
                        name="Şifre"
                        required
                        autoComplete="current-password"
                        className=""
                        placeHolderName="••••••••"
                    />

                    <Button name={loading ? 'Giriş Yapılıyor…' : 'Giriş Yap'} />
                </form>

                <AuthSwitch isLogin={true} />
            </div>
        </div>
    );
}

export default LoginPage;
