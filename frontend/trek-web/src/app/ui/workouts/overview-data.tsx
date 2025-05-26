"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../dashboard/title";

import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from "lucide-react";
import TonalButton from "../buttons/tonal-button";

interface WorkoutOverviewDataProps {
    id: string
}

interface WorkoutData {
    id: string,
    title: string,
    description: string,
    workout: string,
    length: number,
    unit: string,
    date: string
}

export default function WorkoutOverviewData({id}: WorkoutOverviewDataProps) {
    const [overview, setOverview] = useState<WorkoutData>();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/proxy/workouts/${id}`, {
                    withCredentials: true,
                });
                setOverview(response.data)
            
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

    fetchData();
    }, [id]);

    const handleEdit = () => {
        router.push(`${id}/edit`);
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/proxy/workouts/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error("Failed to delete workout:", error);
        }
        router.push("/dashboard/workouts");
    }
    
    return(
        <div className="my-5">
            {overview ? 
            <div>
                <div className="flex row justify-between">
                    <Title text={overview.title} />
                    <div className="flex row gap-2">
                        <TonalButton isSecondary={true} onClick={handleEdit}>
                            Edit<Pencil size={16}/>
                        </TonalButton>
                        <TonalButton isDanger={true} onClick={handleDelete}>
                            Delete<Trash2 size={16} />
                        </TonalButton>
                    </div>
                </div>
                
                <p className="whitespace-pre">{overview.description}</p>
                <p>{overview.date}</p>
                <p className="whitespace-pre">{overview.workout}</p>
                <p>{overview.length} {overview.unit}</p>
            </div> 
            : "Loading data..."}
        </div>
    );
}