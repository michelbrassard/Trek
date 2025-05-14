import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isPrimary?: boolean,
    isSecondary?: boolean,
    isDanger?: boolean,
    isDisabled?: boolean,
    children: React.ReactNode;
}

export default function FilledButton({
    children, 
    className, 
    isPrimary = false, 
    isSecondary = false, 
    isDanger = false,
    isDisabled = false, ...rest}: ButtonProps) {

    const baseStyles = 'flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-base font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50';
    
    const primaryStyles = 'text-white bg-blue-500 hover:bg-blue-400 focus-visible:outline-blue-500 active:bg-blue-600'
    const secondaryStyles = 'text-white bg-neutral-500 hover:bg-neutral-400 focus-visible:outline-neutral-500 active:bg-neutral-600'
    const dangerStyles = 'text-white  bg-red-500 hover:bg-red-400 focus-visible:outline-red-500 active:bg-red-600'
    
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