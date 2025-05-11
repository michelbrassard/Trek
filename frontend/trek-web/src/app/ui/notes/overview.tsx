'use client'

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Note } from "./types"

export default function NotesOverview() {
    const [error, setError] = useState('')
    const [notesOverview, setNotesOverview] = useState<Note[]>([])

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`/api/proxy/notes`, {
                    withCredentials: true,
                });
                setNotesOverview(response.data)
            
            } catch (error) {
                setError('Failed to fetch notes')
                console.error("Failed to fetch data:", error);
            }
        }

        fetchNotes()
    }, [])

    if (error) return <div>Unable to fetch notes</div>

    return(
        notesOverview.length === 0 ?
        <div>No notes found</div>
        :
        <div className="flex flex-col gap-2">
            {
                notesOverview.map((note) => 
                    <Link href={`/dashboard/notes/${note.id}`} key={note.id}>
                        <div className="hover:bg-neutral-200 hover:dark:bg-neutral-800 py-2 px-4  rounded-xl transition-all">
                            <p className="font-bold">{note.title}</p>
                            <p className="text-sm text-neutral-500">{note.createdAt}</p>
                        </div>
                    </Link>
                )
            }
        </div>
    )
}