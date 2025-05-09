"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../dashboard/title";
import InputField from "../form/input-field";
import InputSubmit from "../form/input-submit";
import { useRouter } from 'next/navigation';
import TextArea from "../form/textarea";
import { Competition } from "./types";

interface CompetitionFormProps {
    formTitle: string,
    isEdit: boolean,
    id?: string
}

export default function CompetitionForm({formTitle, isEdit, id}: CompetitionFormProps) {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<Competition>({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        location: "",
        url: ""
    });
    const router = useRouter();

    useEffect(() => {
        if (isEdit && id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/proxy/competitions/${id}`, {
                        withCredentials: true,
                    });
                    setFormData(prev => ({
                        ...prev,
                        title: response.data.title || "",
                        description: response.data.description || "",
                        startDate: response.data.startDate || "",
                        endDate: response.data.endDate || "",
                        location: response.data.location || "",
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

        //VALIDATE AND SANITIZE

        try {
            if (isEdit) {
                await axios.put(`http://localhost:3000/api/proxy/competitions/${id}`,
                    formData,
                    { withCredentials: true }
                );
                router.push(`/dashboard/competitions/${id}`);
            }
            else {
                await axios.post('http://localhost:3000/api/proxy/competitions',
                    formData,
                    { withCredentials: true }
                );
                router.push("/dashboard/competitions");
            }
            
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response) {
                const message = isEdit ? 'Competition edit failed' : 'Competition creation failed'
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
                        <div>
                            <div className="flex flex-row gap-3">
                                <div className="flex-1">
                                    <InputField 
                                        type="text"
                                        name="title"
                                        id="title"
                                        label="title"
                                        onChange={handleChange}
                                        value={formData.title}
                                    />
                                </div>
                                <InputField 
                                    type="date"
                                    name="startDate"
                                    id="startDate"
                                    label="Start Date"
                                    onChange={handleChange}
                                    value={formData.startDate}
                                />
                                <InputField 
                                    type="date"
                                    name="endDate"
                                    id="endDate"
                                    label="End Date"
                                    onChange={handleChange}
                                    value={formData.endDate}
                                />
                            </div>
                            <div>
                                <TextArea 
                                    label={"description"} 
                                    id={"description"} 
                                    name={"description"} 
                                    onChange={handleChange} 
                                    rows={5} 
                                    value={formData.description}
                                />
                            </div>
                            <div className="flex flex-row gap-3">
                                <div className="flex-1">
                                    <InputField 
                                        type="text"
                                        name="location"
                                        id="location"
                                        label="location"
                                        onChange={handleChange}
                                        value={formData.location}
                                    />
                                </div>
                                <InputField 
                                    type="text"
                                    name="url"
                                    id="url"
                                    label="url"
                                    onChange={handleChange}
                                    value={formData.url}
                                />
                            </div>
                            <div className="w-full md:w-[80px]">
                                <InputSubmit name={"submit-workout"} id={"submit-workout"} value={"Save"} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}