"use client"

import clsx from "clsx";
import { useRef, useLayoutEffect } from 'react';

interface TextAreaProps {
    hasProblems?: boolean,
    label: string,
    id: string,
    alertMessage?: string,
    value?: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows: number
}

export default function TextArea({hasProblems, name, label, id, alertMessage, value, onChange}: TextAreaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resizeTextArea = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight + 5}px`;
        }
    };

    useLayoutEffect(() => {
        resizeTextArea()
    }, [value]);
    
    const textareaStyle = "px-3 w-full block py-2 focus:outline-none focus:ring-0 placeholder-neutral-500 bg-neutral-100 dark:bg-neutral-900 rounded-xl resize-none" 
    const labelStyle = "uppercase text-[10px] font-medium text-neutral-500"
    const alertStyle = "border-red-500 dark:border-red-500"

    return(
        (<div>
            <label htmlFor={id} className={labelStyle}>{label}</label>
            <textarea
                ref={textareaRef}
                id={id} 
                name={name} 
                value={value ? value : ''} 
                className={clsx(
                    textareaStyle,
                    hasProblems && alertStyle
                )}
                onInput={resizeTextArea}
                onChange={onChange}
                required
                placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
            >
            </textarea>
            {hasProblems && <p className="text-red-500 text-xs mt-1 ml-1">{alertMessage}</p>}
        </div>
        )   
    );
}