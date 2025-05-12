'use client'

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Resource } from "./types"

export default function ResourcesOverview() {
    const [error, setError] = useState('')
    const [resourcesOverview, setResourcesOverview] = useState<Resource[]>([])

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get(`/api/proxy/resources`, {
                    withCredentials: true,
                });
                setResourcesOverview(response.data)
            
            } catch (error) {
                setError('Failed to fetch resources')
                console.error("Failed to fetch data:", error);
            }
        }

        fetchResources()
    }, [])

    if (error) return <div>Unable to fetch resources</div>

    return(
        resourcesOverview.length === 0 ?
        <div>No resources found</div>
        :
        <div className="flex flex-col gap-2">
            {
                resourcesOverview.map((resource) => 
                    <Link href={`/dashboard/resources/${resource.id}`} key={resource.id}>
                        <div className="hover:bg-neutral-200 hover:dark:bg-neutral-800 py-2 px-4  rounded-xl transition-all">
                            <p className="font-bold">{resource.title}</p>
                            <p className="text-sm text-neutral-500">{resource.description}</p>
                            <p className="text-sm text-blue-500">{resource.url}</p>
                        </div>
                    </Link>
                )
            }
        </div>
    )
}