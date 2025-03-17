"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../dashboard/title";
import InputField from "../form/input-field";
import InputSubmit from "../form/input-submit";
import DOMPurify from "dompurify";

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
                await axios.put('http://localhost:3000/api/proxy/workouts',
                    responseBody,
                    { withCredentials: true }
                );
            }
            else {
                await axios.post('http://localhost:3000/api/proxy/workouts',
                    responseBody,
                    { withCredentials: true }
                );
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
                <InputField 
                    type="text"
                    name="title"
                    id="title"
                    label="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <InputField 
                    type="text"
                    name="description"
                    id="description"
                    label="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <InputField 
                    type="date"
                    name="date"
                    id="date"
                    label="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
                <InputField 
                    type="text"
                    name="workout"
                    id="workout"
                    label="workout"
                    onChange={(e) => setWorkout(e.target.value)}
                    value={workout}
                />
                <InputField 
                    type="number"
                    name="length"
                    id="length"
                    label="length"
                    onChange={(e) => setLength(+e.target.value)}
                    value={length + ""}
                />
                <InputField 
                    type="text"
                    name="unit"
                    id="unit"
                    label="unit"
                    onChange={(e) => setUnit(e.target.value)}
                    value={unit}
                />
                <InputSubmit name={"submit-workout"} id={"submit-workout"} value={"Save"} />
            </form>
        </div>
        
    );
}