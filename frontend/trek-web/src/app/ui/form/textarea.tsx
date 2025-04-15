"use client"

import clsx from "clsx";
import { motion } from 'framer-motion';
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

    
    
    const textareaStyle = "w-full block py-1 w-full focus:outline-none focus:ring-0 placeholder-neutral-500" 
    const labelStyle = "uppercase text-[10px] font-medium text-neutral-500"
    const alertStyle = "border-red-500 dark:border-red-500"

    return(
        value &&
            (<motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0}}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
            >
                <label htmlFor={id} className={labelStyle}>{label}</label>
                <motion.textarea
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    ref={textareaRef}
                    id={id} 
                    name={name} 
                    value={value} 
                    className={clsx(
                        textareaStyle,
                        hasProblems && alertStyle
                    )}
                    onInput={resizeTextArea}
                    onChange={onChange}
                    required
                    placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                >
                </motion.textarea>
                {hasProblems && <p className="text-red-500 text-xs mt-1 ml-1">{alertMessage}</p>}
            </motion.div>
        )
    );
}