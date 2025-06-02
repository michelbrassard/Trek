"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../dashboard/title";
import InputField from "../form/input-field";
import InputSubmit from "../form/input-submit";
import DOMPurify from "dompurify";
import { useRouter } from 'next/navigation';
import TextArea from "../form/textarea";

interface SkillFormProps {
    formTitle: string,
    isEdit: boolean,
    id?: string
}

export default function SkillForm({formTitle, isEdit, id}: SkillFormProps) {
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (isEdit && id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/proxy/skills/${id}`, {
                        withCredentials: true,
                    });
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                }
            };
            fetchData()
        }
      }, [id, isEdit]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //VALIDATE AND SANITIZE
        const sanitizedTitle = DOMPurify.sanitize(title);
        const sanitizedDescription = DOMPurify.sanitize(description);
        
        //const sanitizedLength = length.replace(/[^0-9.]/g, '');

        const responseBody = {
            title: sanitizedTitle, 
            description: sanitizedDescription
        }

        try {
            if (isEdit) {
                await axios.put(`http://localhost:3000/api/proxy/skills/${id}/detail`,
                    responseBody,
                    { withCredentials: true }
                );
                router.push(`/dashboard/skills/${id}`);
            }
            else {
                await axios.post('http://localhost:3000/api/proxy/skills',
                    responseBody,
                    { withCredentials: true }
                );
                router.push("/dashboard/skills");
            }
            
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response) {
                const message = isEdit ? 'Workout edit failed' : 'Workout creation failed'
              setError(error.response.data.error || message);
            } else {
              setError('An error occurred.');
            }
          }
    };

    return(
        <div className="my-5">
            <form onSubmit={handleSubmit}>
                <Title text={formTitle} />
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex row gap-[30px]">
                    <div className="w-full">
                        <InputField 
                            type="text"
                            name="title"
                            id="title"
                            label="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <TextArea 
                            label={"description"} 
                            id={"description"} 
                            name={"description"} 
                            onChange={(e) => setDescription(e.target.value)} 
                            rows={5} 
                            value={description}
                        />
                        <div className="w-full md:w-[80px]">
                            <InputSubmit name={"submit-workout"} id={"submit-workout"} value={"Save"} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}