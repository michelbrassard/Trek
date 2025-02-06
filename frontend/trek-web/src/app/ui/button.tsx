import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button({children, className, ...rest}: ButtonProps) {
    return (
        <button
            {...rest}
            className={clsx(
                'flex items-center py-1 px-3 rounded-md bg-blue-500 text-base font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                className
            )}
        >
            {children}
        </button>
    );
}