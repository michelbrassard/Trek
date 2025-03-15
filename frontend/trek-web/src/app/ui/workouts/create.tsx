"use client"

import axios from "axios";
import { useState } from "react";
import Title from "../dashboard/title";
import InputField from "../form/input-field";
import InputSubmit from "../form/input-submit";
import DOMPurify from "dompurify";

export default function CreateWorkoutForm() {
    const [error, setError] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [workout, setWorkout] = useState("");
    const [length, setLength] = useState(0);
    const [unit, setUnit] = useState("");
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //VALIDATE AND SANITIZE
        const sanitizedTitle = DOMPurify.sanitize(title);
        const sanitizedDescription = DOMPurify.sanitize(description);
        const sanitizedDate = DOMPurify.sanitize(date);
        const sanitizedWorkout = DOMPurify.sanitize(workout);
        
        //const sanitizedLength = length.replace(/[^0-9.]/g, '');

        const sanitizedUnit = DOMPurify.sanitize(unit);

        try {
            await axios.post('http://localhost:3000/api/proxy/workouts',
              { 
                title: sanitizedTitle, 
                description: sanitizedDescription,
                date: sanitizedDate,
                workout: sanitizedWorkout,
                length,
                unit: sanitizedUnit
            },
              { withCredentials: true }
            );
            
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response) {
              setError(error.response.data.error || 'Workout creation failed');
            } else {
              setError('An error occurred.');
            }
          }
    };
    
    return(
        <div>
            {error && <p className="text-red-500">{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <Title text={"Create a Workout"} />
                <InputField 
                    type="text"
                    name="title"
                    id="title"
                    label="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <InputField 
                    type="text"
                    name="description"
                    id="description"
                    label="description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <InputField 
                    type="date"
                    name="date"
                    id="date"
                    label="date"
                    onChange={(e) => setDate(e.target.value)}
                />
                <InputField 
                    type="text"
                    name="workout"
                    id="workout"
                    label="workout"
                    onChange={(e) => setWorkout(e.target.value)}
                />
                <InputField 
                    type="number"
                    name="length"
                    id="length"
                    label="length"
                    onChange={(e) => setLength(+e.target.value)}
                />
                <InputField 
                    type="text"
                    name="unit"
                    id="unit"
                    label="unit"
                    onChange={(e) => setUnit(e.target.value)}
                />
                <InputSubmit name={"submit-workout"} id={"submit-workout"} value={"Save"} />
            </form>
        </div>
        
    );
}