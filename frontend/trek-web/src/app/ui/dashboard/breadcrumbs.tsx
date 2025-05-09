'use client'

import { Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
    const paths = usePathname()
    const pathNames = paths.split('/').filter( path => path )

    return(
        <div className='text-sm flex flex-row items-center gap-2 text-neutral-700 dark:text-neutral-300'>
            {pathNames.map( (link, index) => {
                const href = `/${pathNames.slice(0, index + 1).join('/')}`
                return(
                    <div key={index} className='flex flex-row gap-2 capitalize'>
                        <Link href={href} className='flex items-center bg-neutral-100 dark:bg-neutral-900 hover:text-blue-500 transition-all py-1 px-2 rounded-lg'>
                            {index === 0 ?
                                <Home size={12} className='my-1'/>
                                : 
                                <p className='truncate max-w-[150px] md:max-w-[20px] lg:max-w-[120px] xl:max-w-[400px] overflow-hidden whitespace-nowrap'>{link}</p>
                            }
                        </Link>
                        {pathNames.length !== index + 1 && 
                            <p className='text-lg'> / </p>
                        }
                    </div>
                )
            } )}
        </div>
    )
}