interface InputSubmitProps {
    name: string,
    id: string,
    value: string
}

export default function InputSubmit(
    {name, id, value} : InputSubmitProps
) {
    const buttonStyle = "mt-6 bg-blue-500 hover:bg-blue-400 hover:cursor-pointer active:bg-blue-600 block px-4 py-3 rounded-2xl w-full text-base font-medium text-white transition-colors"
    return(
        <input 
            type="submit" 
            name={name} 
            id={id} 
            className={buttonStyle}
            value={value}
        />
        
    )
}