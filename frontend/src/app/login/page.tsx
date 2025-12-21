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
    const { setAuthToken, isAuthenticated, isReady } = useAuth();

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
            setAuthToken(res);
            router.replace('/dashboard');
        } catch (err: any) {
            setError(err?.response?.data?.message ?? 'Giriş başarısız. Bilgilerinizi kontrol edin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col justify-center py-12 px-6 lg:px-8 bg-gray-50 dark:bg-background 2xl:scale-120 transition-colors duration-300">
            <div className="sm:mx-auto sm:w-full sm:max-w-md 2xl:max-w-[700px] 2xl:scale-150 2xl:origin-bottom 2xl:mb-6">
                <AuthHeader name="Tekrar Hoşgeldiniz" color="green" />
            </div>

            <div className="mt-10 2xl:mt-16 sm:mx-auto sm:w-full sm:max-w-md 2xl:scale-125">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <div className='flex flex-col gap-6 2xl:gap-8'>
                        <Input
                            id="email"
                            type="email"
                            name="E-Posta"
                            fieldName="email"
                            required
                            autoComplete="email"
                            className="h-11 2xl:h-13 2xl:text-xl 2xl:px-6"
                            placeHolderName="ex@example.com"
                        />

                        <Input
                            id="password"
                            type="password"
                            name="Şifre"
                            fieldName="password"
                            required
                            autoComplete="current-password"
                            className="h-11 2xl:h-13 2xl:text-xl 2xl:px-6"
                            placeHolderName="••••••••"
                        />
                    </div>

                    <Button name={loading ? 'Giriş Yapılıyor…' : 'Giriş Yap'} />
                </form>

                <div className=''>
                    <AuthSwitch isLogin={true} />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
