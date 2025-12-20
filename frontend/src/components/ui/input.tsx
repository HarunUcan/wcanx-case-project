import React from 'react';

function Input({
    id,
    type,
    name,          // label’da görünen metin
    fieldName,     // FormData için gerçek name
    required,
    autoComplete,
    className,
    placeHolderName,
}: {
    id: string;
    type: string;
    name: string;
    fieldName: string;
    required?: boolean;
    autoComplete?: string;
    className?: string;
    placeHolderName?: string;
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm/6 font-semibold text-gray-900 2xl:text-xl"
            >
                {name}
            </label>

            <div className="mt-2 2xl:mt-6">
                <input
                    id={id}
                    type={type}
                    name={fieldName}
                    required={required}
                    autoComplete={autoComplete}
                    className={`block w-full rounded-full bg-white px-3 py-1.5 text-base text-gray-900 outline-2 outline-green-400 placeholder:text-gray-400 focus:outline-3 focus:outline-green-400 sm:text-sm/6 shadow-lg shadow-green-500/50 ${className}`}
                    placeholder={placeHolderName}
                />
            </div>
        </div>
    );
}

export default Input;
