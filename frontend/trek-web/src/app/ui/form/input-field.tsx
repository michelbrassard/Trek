import clsx from 'clsx';
//import DOMPurify from 'dompurify';

interface InputFieldProps {
    type: string,
    name: string,
    id: string,
    label: string,
    value?: string,
    hasProblems?: boolean,
    alertMessage?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField(
    {type, name, id, label, value, hasProblems = false, alertMessage, onChange} : InputFieldProps
) {
    const buttonStyle = "block border bg-neutral-100 dark:bg-neutral-800 border-neutral-400 dark:border-neutral-600 active:dark:bg-neutral-700 active:bg-neutral-300 active:ring-blue-500 active:border-blue-500 px-4 py-3 rounded-2xl w-full"
    const labelStyle = "ml-1 uppercase text-[10px] font-medium text-neutral-500"
    const alertStyle = "border-red-500 dark:border-red-500"
    return(
        <div>
            <label htmlFor={id} className={labelStyle}>{label}</label>
            <input 
                type={type} 
                name={name} 
                id={id} 
                className={clsx(
                    buttonStyle,
                    hasProblems && alertStyle
                )}
                value={value}
                onChange={onChange}
                required
            />
            {hasProblems && <p className="text-red-500 text-xs mt-1 ml-1">{alertMessage}</p>}
        </div>
    )
}