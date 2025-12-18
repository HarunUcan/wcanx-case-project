import React from 'react'

function AuthHeader({ name, color }: { name: string, color: string }) {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img src={`https://wcanx.co/logo.png`} alt="Your Company" className="mx-auto h-14 w-auto" />
            <h2 className="mt-8 text-center text-3xl font-bold tracking-tight text-gray-900">{name}</h2>
        </div>
    )
}

export default AuthHeader