interface InputFieldProps {
    type: string,
    name: string,
    id: string,
    label: string
}

export default function InputField(
    {type, name, id, label} : InputFieldProps
) {
    const buttonStyle = "block border bg-neutral-800 border-neutral-600 active:bg-neutral-700 active:ring-blue-500 active:border-blue-500 px-4 py-3 rounded-2xl w-full"
    const labelStyle = "ml-1 uppercase text-[10px] font-medium text-neutral-500"
    return(
        <div>
            <label htmlFor={id} className={labelStyle}>{label}</label>
            <input 
                type={type} 
                name={name} 
                id={id} 
                className={buttonStyle}
                required
            />
        </div>
        
    )
}