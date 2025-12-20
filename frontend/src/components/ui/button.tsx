import React from 'react'

function Button({ name }: { name: string }) {
    return (
        <button type="submit" className="flex w-2/3 mx-auto 2xl:mt-12 justify-center rounded-full bg-green-400 px-3 py-1.5 text-sm/6 2xl:text-xl font-semibold text-black hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 shadow-lg shadow-green-500/50 cursor-pointer transition duration-200">{name}</button>

    )
}

export default Button