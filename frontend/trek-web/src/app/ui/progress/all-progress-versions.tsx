'use client'

import { useEffect, useState } from "react";
import axios from "axios";

interface Content {
    createdAt: string,
    content: string
}

interface ProgressVersionsType {
    id: string,
    title: string,
    description: string
    contents: Content[]
}

export default function AllProgressVersionsList() {
    const [error, setError] = useState("");
    const [allProgressVersions, setAllProgressVersions] = useState<ProgressVersionsType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/proxy/progress/versions`, {
                    withCredentials: true,
                });
                setAllProgressVersions(response.data)
            } catch (error) {
                setError("Unable to get versions")
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData()
    }, []);

    if (error) return(<div>{error}</div>)

    if (allProgressVersions.length === 0) return(<div>Loading</div>)

    return(
        <div className="flex flex-row gap-5">
            {allProgressVersions.map((progressVersion) => (
                <div key={progressVersion.id} className="w-[300px]">
                    <h2 className="text-lg font-bold">{progressVersion.title}</h2>
                    <p className="text-sm text-neutral-500">{progressVersion.description}</p>
                    <p>Versions:</p>
                    {progressVersion.contents.length === 0 ? 
                        <div>No previous versions</div> 
                        :
                        <div className="flex flex-col gap-2">
                            {progressVersion.contents.map((content) => (
                                <div key={content.createdAt}>
                                    <p className="text-sm text-neutral-500">{content.createdAt}</p>
                                    <p className="truncate">{content.content}</p>
                                </div>
                            ))
                            }
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}