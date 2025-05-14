import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isPrimary?: boolean,
    isSecondary?: boolean,
    isDanger?: boolean,
    isDisabled?: boolean,
    children: React.ReactNode;
}

export default function TextButton({
    children, 
    className, 
    isPrimary = false, 
    isSecondary = false, 
    isDanger = false,
    isDisabled = false, ...rest}: ButtonProps) {

    const baseStyles = 'flex items-center justify-center gap-1 text-base font-medium transition-all aria-disabled:cursor-not-allowed aria-disabled:opacity-50';
    
    const primaryStyles = 'text-blue-500 hover:text-blue-400 active:text-blue-600 hover:dark:text-blue-600 active:dark:text-blue-400'
    const secondaryStyles = 'text-neutral-500 hover:text-neutral-400 active:text-neutral-600 hover:dark:text-neutral-600 active:dark:text-neutral-400'
    const dangerStyles = 'text-red-500 hover:text-red-400 active:text-red-600 hover:dark:text-red-600 active:dark:text-red-400'
    
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