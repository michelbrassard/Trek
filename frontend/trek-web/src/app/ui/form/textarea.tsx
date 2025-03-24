"use client"

import clsx from "clsx";

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

export default function TextArea({hasProblems, name, label, id, alertMessage, value, onChange, rows}: TextAreaProps) {
    const textareaStyle = "w-full block border bg-neutral-100 dark:bg-neutral-800 border-neutral-400 dark:border-neutral-600 active:dark:bg-neutral-700 active:bg-neutral-300 active:ring-blue-500 active:border-blue-500 px-4 py-3 rounded-2xl w-full"
    const labelStyle = "ml-1 uppercase text-[10px] font-medium text-neutral-500"
    const alertStyle = "border-red-500 dark:border-red-500"

    return(
        <div>
            <label htmlFor={id} className={labelStyle}>{label}</label>
            <textarea 
                id={id} 
                name={name} 
                rows={rows}
                value={value} 
                className={clsx(
                    textareaStyle,
                    hasProblems && alertStyle
                )}
                onChange={onChange}
                required
            >
            </textarea>
            {hasProblems && <p className="text-red-500 text-xs mt-1 ml-1">{alertMessage}</p>}
        </div>
    );
}