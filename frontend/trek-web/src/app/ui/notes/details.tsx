'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import Title from "../dashboard/title"
import { Note } from "./types"

interface NotesDetailsDataProps {
    id: string
}

export default function NotesDetails({id}: NotesDetailsDataProps) {
    const [error, setError] = useState('')
    const [noteDetails, setNoteDetails] = useState<Note>()

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

    if (error) return <div>Unable to fetch notes</div>

    return (
        noteDetails ? 
            <div>
                <Title text={noteDetails.title} />
                <p className="text-sm text-neutral-500">{noteDetails.createdAt}</p>
                <p>{noteDetails.note}</p>
            </div>
            :
            <div>Loading details...</div>
    )
}