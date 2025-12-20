import Link from 'next/link'
import React from 'react'

function AuthSwitch({ isLogin }: { isLogin: boolean }) {
    return (
        <div>
            <hr className="h-px w-3/5 mx-auto mt-8 bg-gray-300 border-0"></hr>
            <p className="mt-6 text-center text-sm/6 2xl:text-lg text-gray-500">
                {isLogin ? 'Hesabın yok mu?' : 'Hesabın var mı?'}
                <Link href={isLogin ? "/register" : "/login"} className="font-semibold text-green-600 hover:text-green-700 transition duration-200"> {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}</Link>
            </p>
        </div>

    )
}

export default AuthSwitch