'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import Title from "../dashboard/title"
import { useRouter } from "next/navigation"
import { Pencil, Trash2 } from "lucide-react"
import Button from "../buttons/button"

interface NotesDetailsDataProps {
    id: string
}

interface Content {
    createdAt: string,
    content: string
}

interface ProgressWithLatestContent {
    id: string,
    title: string,
    description: string
    latest?: Content
}

export default function ProgressDetails({id}: NotesDetailsDataProps) {
    const [error, setError] = useState('')
    const [progressDetails, setProgressDetails] = useState<ProgressWithLatestContent>()
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/proxy/progress/${id}`, {
                    withCredentials: true,
                });
                setProgressDetails(response.data)
            
            } catch (error) {
                setError("Unable to fetch progress details")
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleEdit = () => {
        router.push(`${id}/edit`);
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/proxy/progress/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error("Failed to delete progress item:", error);
        }
        router.push("/dashboard/progress");
    }

    if (error) return <div>Unable to fetch progress item</div>

    return (
        progressDetails ? 
            <div className="my-5">
                <div className="flex row justify-between">
                    <Title text={progressDetails.title} />
                    <div className="flex row gap-2">
                        <Button isSecondary={true} onClick={handleEdit}>
                            Edit<Pencil size={16}/>
                        </Button>
                        <Button isDanger={true} onClick={handleDelete}>
                            Delete<Trash2 size={16} />
                        </Button>
                    </div>
                </div>

                <p className="text-sm text-neutral-500">{progressDetails.description}</p>
                {progressDetails.latest &&
                    <>
                        <p>{progressDetails.latest.createdAt}</p>
                        <p>{progressDetails.latest.content}</p>
                    </>
                }
            </div>
            :
            <div>Loading details...</div>
    )
}