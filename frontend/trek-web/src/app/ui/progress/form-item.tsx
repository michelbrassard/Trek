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

interface FormProgressData {
    title: string,
    description: string
}

export default function ProgressForm({formTitle, isEdit, id}: FormProps) {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<FormProgressData>({
            title: "",
            description: ""
        });
    const router = useRouter();

    useEffect(() => {
        if (isEdit && id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/proxy/progress/${id}`, {
                        withCredentials: true,
                    });
                    setFormData(prev => ({
                        ...prev,
                        title: response.data.title || "",
                        description: response.data.description || ""
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

        //Validate/sanitize

        try {
            if (isEdit) {
                await axios.put(`http://localhost:3000/api/proxy/progress/${id}`,
                    formData,
                    { withCredentials: true }
                );
                router.push(`/dashboard/progress/${id}`);
            }
            else {
                await axios.post('http://localhost:3000/api/proxy/progress',
                    formData,
                    { withCredentials: true }
                );
                router.push("/dashboard/progress");
            }
            
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                const message = isEdit ? 'Progress item edit failed' : 'Progress item creation failed'
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
                label={"description"} 
                id={"description"} 
                name={"description"} 
                onChange={handleChange} 
                value={formData["description"]}
                rows={5} 
            />
        </form>
    )
}