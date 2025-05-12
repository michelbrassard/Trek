'use client'

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Progress } from "./types"

export default function ProgressOverview() {
    const [error, setError] = useState('')
    const [progressOverview, setProgressOverview] = useState<Progress[]>([])

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await axios.get(`/api/proxy/progress`, {
                    withCredentials: true,
                });
                setProgressOverview(response.data)
            
            } catch (error) {
                setError('Failed to fetch progress data')
                console.error("Failed to fetch data:", error);
            }
        }

        fetchProgress()
    }, [])

    if (error) return <div>Unable to fetch progress data</div>

    return(
        progressOverview.length === 0 ?
        <div>No progress items found</div>
        :
        <div className="flex flex-col gap-2">
            {
                progressOverview.map((progress) => 
                    <Link href={`/dashboard/progress/${progress.id}`} key={progress.id}>
                        <div className="hover:bg-neutral-200 hover:dark:bg-neutral-800 py-2 px-4  rounded-xl transition-all">
                            <p className="font-bold">{progress.title}</p>
                            <p className="text-sm text-neutral-500">{progress.description}</p>
                        </div>
                    </Link>
                )
            }
        </div>
    )
}