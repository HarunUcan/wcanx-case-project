'use client';

import AuthHeader from '@/components/auth/AuthHeader';
import AuthSwitch from '@/components/auth/AuthSwitch';
import RegisterLeftArea from '@/components/auth/RegisterLeftArea';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/context/AuthContext';

function RegisterPage() {
    const router = useRouter();
    const { isAuthenticated, isReady } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // zaten giriş yapıldıysa register ekranına sokma
    useEffect(() => {
        if (!isReady) return;
        if (isAuthenticated) router.replace('/dashboard');
    }, [isAuthenticated, isReady, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const fd = new FormData(e.currentTarget);
            const email = String(fd.get('email') ?? '').trim();
            const password = String(fd.get('password') ?? '');

            if (!email || !password) {
                setError('E-posta ve şifre zorunludur.');
                return;
            }

            await authService.register({ email, password });

            setSuccess('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
            router.replace('/login');
        } catch (err: any) {
            setError(err?.response?.data?.message ?? 'Kayıt başarısız. Bilgilerinizi kontrol edin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-full 2xl:my-auto bg-white shadow-lg 2xl:items-center w-full lg:w-4/5 mx-auto mt-4 lg:border lg:border-green-950 rounded-4xl justify-center overflow-hidden">
            <RegisterLeftArea />
            <div className="w-full lg:w-1/2 py-12">
                <AuthHeader name="Hesap Oluştur" color="green" />

                <div className="mt-10 sm:mx-auto px-12">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                                {success}
                            </div>
                        )}

                        <Input
                            id="email"
                            type="email"
                            name="E-Posta"
                            required
                            autoComplete="email"
                            // 2xl:h-16 -> Input yüksekliği artırıldı
                            // 2xl:text-xl -> Yazı boyutu büyütüldü
                            // 2xl:px-6 -> Input iç boşluğu artırıldı
                            className="h-11 2xl:h-13 2xl:text-xl 2xl:px-6"
                            placeHolderName="ex@example.com"
                        />

                        <Input
                            id="password"
                            type="password"
                            name="Şifre"
                            required
                            autoComplete="current-password"
                            className="h-11 2xl:h-13 2xl:text-xl 2xl:px-6"
                            placeHolderName="••••••••"
                        />

                        <Button name={loading ? 'Kayıt Olunuyor…' : 'Kayıt Ol'} />
                    </form>

                    <AuthSwitch isLogin={false} />
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
