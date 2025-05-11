"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import InputField from "../form/input-field";
import TextArea from "../form/textarea";
import Title from "../dashboard/title";
import InputSubmit from "../form/input-submit";

interface FormProps {
    formTitle: string,
    isEdit: boolean,
    id?: string
}

interface FormNoteData {
    title: string,
    note: string,
    updatedAt: string
}

export default function NoteForm({formTitle, isEdit, id}: FormProps) {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<FormNoteData>({
            title: "",
            note: "",
            updatedAt: ""
        });
    const router = useRouter();

    useEffect(() => {
        if (isEdit && id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/proxy/notes/${id}`, {
                        withCredentials: true,
                    });
                    setFormData(prev => ({
                        ...prev,
                        title: response.data.title || "",
                        note: response.data.note || "",
                        updatedAt: response.data.updatedAt || ""
                    }));
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                }
            };
            fetchData()
        }
    }, [id, isEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        formData["updatedAt"] = new Date().toISOString().split('T')[0];

        //Validate/sanitize

        try {
            if (isEdit) {
                await axios.put(`http://localhost:3000/api/proxy/notes/${id}`,
                    formData,
                    { withCredentials: true }
                );
                router.push(`/dashboard/notes/${id}`);
            }
            else {
                await axios.post('http://localhost:3000/api/proxy/notes',
                    formData,
                    { withCredentials: true }
                );
                router.push("/dashboard/notes");
            }
            
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                const message = isEdit ? 'Note edit failed' : 'Note creation failed'
                setError(error.response.data.error || message);
            } else {
                setError('An error occurred.');
            }
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between items-center">
                <div className="mt-6">
                    <Title text={formTitle} />
                </div>
                <div className="w-full md:w-[80px] flex items-center">
                    <InputSubmit name={"submit-note"} id={"submit-note"} value={"Save"} />
                </div>
            </div>
            
            {error && <p className="text-red-500">{error}</p>}
            <InputField 
                type={"text"} 
                name={"title"} 
                id={"title"} 
                label={"Title"} 
                value={formData["title"]}
                onChange={handleChange} 
            />
            <TextArea 
                label={"Note"} 
                id={"note"} 
                name={"note"} 
                onChange={handleChange} 
                value={formData["note"]}
                rows={5} 
            />
        </form>
    )
}