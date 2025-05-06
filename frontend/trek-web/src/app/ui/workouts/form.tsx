"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../dashboard/title";
import InputField from "../form/input-field";
import InputSubmit from "../form/input-submit";
import DOMPurify from "dompurify";
import { useRouter } from 'next/navigation';
import TextArea from "../form/textarea";

interface WorkoutFormProps {
    formTitle: string,
    isEdit: boolean,
    id?: string
}

export default function WorkoutForm({formTitle, isEdit, id}: WorkoutFormProps) {
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [workout, setWorkout] = useState("");
    const [length, setLength] = useState(0);
    const [unit, setUnit] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (isEdit && id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/proxy/workouts/${id}`, {
                        withCredentials: true,
                    });
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    setDate(response.data.date);
                    setWorkout(response.data.workout);
                    setLength(response.data.length);
                    setUnit(response.data.unit);
                
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
        const sanitizedDate = DOMPurify.sanitize(date);
        const sanitizedWorkout = DOMPurify.sanitize(workout);
        
        //const sanitizedLength = length.replace(/[^0-9.]/g, '');

        const sanitizedUnit = DOMPurify.sanitize(unit);
        const responseBody = {
            title: sanitizedTitle, 
            description: sanitizedDescription,
            date: sanitizedDate,
            workout: sanitizedWorkout,
            length,
            unit: sanitizedUnit
        }

        try {
            if (isEdit) {
                await axios.put(`http://localhost:3000/api/proxy/workouts/${id}`,
                    responseBody,
                    { withCredentials: true }
                );
                router.push(`/dashboard/workouts/${id}`);
            }
            else {
                await axios.post('http://localhost:3000/api/proxy/workouts',
                    responseBody,
                    { withCredentials: true }
                );
                router.push("/dashboard/workouts");
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
                        <div>
                            <div className="flex flex-row gap-3">
                                <div className="flex-1">
                                    <InputField 
                                        type="text"
                                        name="title"
                                        id="title"
                                        label="title"
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                    />
                                </div>
                                <InputField 
                                    type="date"
                                    name="date"
                                    id="date"
                                    label="date"
                                    onChange={(e) => setDate(e.target.value)}
                                    value={date}
                                />
                            </div>
                            <div>
                                <TextArea 
                                    label={"description"} 
                                    id={"description"} 
                                    name={"description"} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    rows={5} 
                                    value={description}
                                />
                            </div>
                            <div className="flex flex-row gap-3">
                                <div className="flex-1">
                                    <InputField 
                                        type="number"
                                        name="length"
                                        id="length"
                                        label="length"
                                        onChange={(e) => setLength(+e.target.value)}
                                        value={length + ""}
                                    />
                                </div>
                                <InputField 
                                    type="text"
                                    name="unit"
                                    id="unit"
                                    label="unit"
                                    onChange={(e) => setUnit(e.target.value)}
                                    value={unit}
                                />
                            </div>
                            <div className="w-full md:w-[80px]">
                                <InputSubmit name={"submit-workout"} id={"submit-workout"} value={"Save"} />
                            </div>
                        </div>
                        
                    </div>
                    <div className="w-full">
                        <TextArea 
                            label={"workout"} 
                            id={"workout"} 
                            name={"workout"} 
                            onChange={(e) => setWorkout(e.target.value)} 
                            rows={5} 
                            value={workout}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}