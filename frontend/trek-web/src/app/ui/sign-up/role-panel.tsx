interface RolePanelProps {
    image: string,
    title: string,
    description: string
}

export default function RolePanel({
    image, title, description
}:RolePanelProps) {
    return(
        <div className='bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 hover:dark:bg-neutral-800 px-5 py-4 transition-colors rounded-xl w-full md:w-80 h-64'>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <p>{description}</p>
        </div>
    )
  }