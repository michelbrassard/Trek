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

interface FormResourceData {
    title: string,
    description: string,
    url: string
}

export default function ResourceForm({formTitle, isEdit, id}: FormProps) {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<FormResourceData>({
            title: "",
            description: "",
            url: ""
        });
    const router = useRouter();

    useEffect(() => {
        if (isEdit && id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/proxy/resources/${id}`, {
                        withCredentials: true,
                    });
                    setFormData(prev => ({
                        ...prev,
                        title: response.data.title || "",
                        description: response.data.description || "",
                        url: response.data.url || ""
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
                await axios.put(`http://localhost:3000/api/proxy/resources/${id}`,
                    formData,
                    { withCredentials: true }
                );
                router.push(`/dashboard/resources/${id}`);
            }
            else {
                await axios.post('http://localhost:3000/api/proxy/resources',
                    formData,
                    { withCredentials: true }
                );
                router.push("/dashboard/resources");
            }
            
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                const message = isEdit ? 'Resource edit failed' : 'Resource creation failed'
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
                    <InputSubmit name={"submit-resource"} id={"submit-resource"} value={"Save"} />
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
            <InputField 
                type={"text"} 
                name={"url"} 
                id={"url"} 
                label={"URL"} 
                value={formData["url"]}
                onChange={handleChange} 
            />
            <TextArea 
                label={"Description"} 
                id={"description"} 
                name={"description"} 
                onChange={handleChange} 
                value={formData["description"]}
                rows={5} 
            />
        </form>
    )
}