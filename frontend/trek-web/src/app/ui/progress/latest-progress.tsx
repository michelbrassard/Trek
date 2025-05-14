'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import Title from "../dashboard/title"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, History } from "lucide-react"
import Button from "../buttons/button"
import TextArea from "../form/textarea"
import InputSubmit from "../form/input-submit"

interface ProgressDetailsDataProps {
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

export default function ProgressDetails({id}: ProgressDetailsDataProps) {
    const [error, setError] = useState('')
    const [progressDetails, setProgressDetails] = useState<ProgressWithLatestContent>()
    const router = useRouter();
    const [content, setContent] = useState('')
    const [hasContentChanged, setHasContentChanged] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/proxy/progress/${id}`, {
                    withCredentials: true,
                });
                setProgressDetails(response.data)
                if (response.data.latest?.content) {
                    setContent(response.data.latest.content)
                }
                
            
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

    const handleVersions = () => {
        router.push(`${id}/versions`)
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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setContent(value);
        setHasContentChanged(true)
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:3000/api/proxy/progress/${id}/save`,
                {
                    content: content,
                    progressId: id
                },
                { withCredentials: true }
            );
            setHasContentChanged(false)
            
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                const message = 'Progress creation failed'
                setError(error.response.data.error || message);
            } else {
                setError('An error occurred.');
            }
        }
    }

    if (error) return <div>Unable to fetch progress item</div>

    return (
        progressDetails ? 
            <div className="my-5">
                <div className="flex row justify-between">
                    <Title text={progressDetails.title} />
                    <div className="flex row gap-2">
                        <Button isSecondary={true} onClick={handleVersions}>
                            Versions<History size={16}/>
                        </Button>
                        <Button isSecondary={true} onClick={handleEdit}>
                            Edit<Pencil size={16}/>
                        </Button>
                        <Button isDanger={true} onClick={handleDelete}>
                            Delete<Trash2 size={16} />
                        </Button>
                    </div>
                </div>

                <p className="text-sm text-neutral-500">{progressDetails.description}</p>
                {progressDetails.latest && <p>{progressDetails.latest.createdAt}</p>}
                <form onSubmit={handleSave}>
                    <TextArea 
                        label={"Content"} 
                        id={"content"} 
                        name={"content"}
                        value={content}
                        onChange={handleChange}
                        rows={5} 
                    />
                    {hasContentChanged && 
                        <InputSubmit name={"submit"} id={"submit"} value={"Save"} />
                    }
                </form>
            </div>
            :
            <div>Loading details...</div>
    )
}