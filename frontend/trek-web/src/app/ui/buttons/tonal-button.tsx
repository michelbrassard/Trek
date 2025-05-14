import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isPrimary?: boolean,
    isSecondary?: boolean,
    isDanger?: boolean,
    isDisabled?: boolean,
    children: React.ReactNode;
}

export default function TonalButton({
    children, 
    className, 
    isPrimary = false, 
    isSecondary = false, 
    isDanger = false,
    isDisabled = false, ...rest}: ButtonProps) {

    const baseStyles = 'flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-base font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50';
    
    const primaryStyles = 'text-blue-500 focus-visible:outline-blue-500 active:bg-blue-600 bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900'
    const secondaryStyles = 'text-neutral-500 focus-visible:outline-neutral-500 active:bg-neutral-300 active:dark:bg-neutral-600 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800'
    const dangerStyles = 'text-red-500 focus-visible:outline-red-500 active:bg-red-600 bg-red-50 dark:bg-red-950 hover:bg-red-100 dark:hover:bg-red-900'
    
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