'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import Title from "../dashboard/title"
import { Note } from "./types"
import { useRouter } from "next/navigation"
import { Pencil, Trash2 } from "lucide-react"
import TonalButton from "../buttons/tonal-button"

interface NotesDetailsDataProps {
    id: string
}

export default function NotesDetails({id}: NotesDetailsDataProps) {
    const [error, setError] = useState('')
    const [noteDetails, setNoteDetails] = useState<Note>()
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/proxy/notes/${id}`, {
                    withCredentials: true,
                });
                setNoteDetails(response.data)
            
            } catch (error) {
                setError("Unable to fetch note details")
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
            await axios.delete(`http://localhost:3000/api/proxy/notes/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
        router.push("/dashboard/notes");
    }

    if (error) return <div>Unable to fetch notes</div>

    return (
        noteDetails ? 
            <div className="my-5">
                <div className="flex row justify-between">
                    <Title text={noteDetails.title} />
                    <div className="flex row gap-2">
                        <TonalButton isSecondary={true} onClick={handleEdit}>
                            Edit<Pencil size={16}/>
                        </TonalButton>
                        <TonalButton isDanger={true} onClick={handleDelete}>
                            Delete<Trash2 size={16} />
                        </TonalButton>
                    </div>
                </div>

                <p className="text-sm text-neutral-500">{noteDetails.createdAt}</p>
                <p>{noteDetails.note}</p>
            </div>
            :
            <div>Loading details...</div>
    )
}