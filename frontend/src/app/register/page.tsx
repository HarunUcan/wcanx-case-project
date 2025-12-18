import AuthHeader from '@/components/auth/AuthHeader'
import AuthSwitch from '@/components/auth/AuthSwitch'
import RegisterLeftArea from '@/components/auth/RegisterLeftArea'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import React from 'react'

function RegisterPage() {
    return (
        <div className="flex min-h-full w-full lg:w-4/5 mx-auto mt-4 lg:border lg:border-green-950 rounded-4xl justify-center overflow-hidden">
            <RegisterLeftArea />
            <div className='w-full lg:w-1/2 py-12'>
                <AuthHeader name="Hesap Oluştur" color="green" />

                <div className="mt-10 sm:mx-auto px-12">
                    <form action="#" method="POST" className="space-y-6">

                        <Input id="email" type="email" name="E-Posta" required autoComplete="email" className="" placeHolderName='ex@example.com' />

                        <Input id="password" type="password" name="Şifre" required autoComplete="current-password" className="" placeHolderName='••••••••' />

                        <Button name="Kayıt Ol" />

                    </form>

                    <AuthSwitch isLogin={false} />
                </div>
            </div>

        </div>
    )
}

export default RegisterPage