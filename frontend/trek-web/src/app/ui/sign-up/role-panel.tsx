interface RolePanelProps {
    image: string,
    title: string,
    description: string
}

export default function RolePanel({
    image, title, description
}:RolePanelProps) {
    return(
        <div className='bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 hover:dark:bg-neutral-700 px-5 py-4 transition-colors rounded-xl w-full md:w-80 h-64'>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <p>{description}</p>
        </div>
    )
  }