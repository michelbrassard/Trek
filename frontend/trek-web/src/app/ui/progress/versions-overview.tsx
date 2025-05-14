'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../dashboard/title";

interface ProgressVersionDataProps {
    id: string
}

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

export default function ProgressVersions({id}: ProgressVersionDataProps) {
    const [error, setError] = useState("");
    const [progressVersions, setProgressVersions] = useState<ProgressVersionsType>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/proxy/progress/${id}/versions`, {
                    withCredentials: true,
                });
                setProgressVersions(response.data)
            } catch (error) {
                setError("Unable to get versions")
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData()
    }, [id]);

    if (error) return(<div>{error}</div>)

    return(
        progressVersions ? 
            <div>
                <Title text={progressVersions.title} />
                <p className="text-sm text-neutral-500">{progressVersions.description}</p>
                <p>Versions:</p>
                {progressVersions.contents.length === 0 ? 
                    <div>No previous versions</div> 
                    :
                    <div className="flex flex-col gap-2">
                        {progressVersions.contents.map((content) => (
                            <div key={content.createdAt}>
                                <p className="text-sm text-neutral-500">{content.createdAt}</p>
                                <p>{content.content}</p>
                            </div>
                        ))
                        }
                    </div>
                    
                }
            </div>
            :
            <div>Loading data...</div>
    )
}