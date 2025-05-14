'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import Title from "../dashboard/title"
import { useRouter } from "next/navigation"
import { Pencil, Trash2 } from "lucide-react"
import { Resource } from "./types"
import TonalButton from "../buttons/tonal-button"

interface ResourceDetailsDataProps {
    id: string
}

export default function ResourceDetails({id}: ResourceDetailsDataProps) {
    const [error, setError] = useState('')
    const [resourceDetails, setResourceDetails] = useState<Resource>()
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/proxy/resources/${id}`, {
                    withCredentials: true,
                });
                setResourceDetails(response.data)
            
            } catch (error) {
                setError("Unable to fetch resource details")
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
            await axios.delete(`http://localhost:3000/api/proxy/resources/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error("Failed to delete resource:", error);
        }
        router.push("/dashboard/resources");
    }

    if (error) return <div>Unable to fetch resources</div>

    return (
        resourceDetails ? 
            <div className="my-5">
                <div className="flex row justify-between">
                    <Title text={resourceDetails.title} />
                    <div className="flex row gap-2">
                        <TonalButton isSecondary={true} onClick={handleEdit}>
                            Edit<Pencil size={16}/>
                        </TonalButton>
                        <TonalButton isDanger={true} onClick={handleDelete}>
                            Delete<Trash2 size={16} />
                        </TonalButton>
                    </div>
                </div>

                <p className="text-sm text-blue-500">{resourceDetails.url}</p>
                <p>{resourceDetails.description}</p>
            </div>
            :
            <div>Loading details...</div>
    )
}