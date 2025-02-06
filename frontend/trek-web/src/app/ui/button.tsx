import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isPrimary?: boolean,
    isSecondary?: boolean,
    isDanger?: boolean,
    isDisabled?: boolean,
    children: React.ReactNode;
}

export function Button({
    children, 
    className, 
    isPrimary = false, 
    isSecondary = false, 
    isDanger = false,
    isDisabled = false, ...rest}: ButtonProps) {

    const baseStyles = 'flex items-center py-2 px-4 rounded-xl text-base font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50';
    const primaryStyles = 'bg-blue-500 hover:bg-blue-400 focus-visible:outline-blue-500 active:bg-blue-600'
    const secondaryStyles = 'bg-gray-500 hover:bg-gray-400 focus-visible:outline-gray-500 active:bg-gray-600 '
    const dangerStyles = 'bg-red-500 hover:bg-red-400 focus-visible:outline-red-500 active:bg-red-600'
    const disabledStyles = 'opacity-50 cursor-not-allowed'

    return (
        <button
            {...rest}
            className={clsx(
                baseStyles,
                isPrimary && primaryStyles,
                isSecondary && secondaryStyles,
                isDanger && dangerStyles,
                isDisabled && disabledStyles,
                className
            )}
            disabled={isDisabled}
            //onClick={!isDisabled ? onClick : undefined}
        >
            {children}
        </button>
    );
}