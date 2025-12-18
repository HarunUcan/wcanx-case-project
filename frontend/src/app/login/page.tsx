import AuthHeader from '@/components/auth/AuthHeader'
import AuthSwitch from '@/components/auth/AuthSwitch'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import React from 'react'

function LoginPage() {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

            <AuthHeader name="Tekrar Hoşgeldiniz" color="green" />

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">

                    <Input id="email" type="email" name="E-Posta" required autoComplete="email" className="" placeHolderName='ex@example.com' />

                    <Input id="password" type="password" name="Şifre" required autoComplete="current-password" className="" placeHolderName='••••••••' />

                    <Button name="Giriş Yap" />

                </form>

                <AuthSwitch isLogin={true} />
            </div>
        </div>
    )
}

export default LoginPage