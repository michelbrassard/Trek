"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../dashboard/title";
import { Button } from "../button";

interface WorkoutOverviewDataProps {
    id: string
}

interface DataProps {
    id: string,
    title: string,
    description: string,
    workout: string,
    length: number,
    unit: string,
    date: string
}

export default function WorkoutOverviewData({id}: WorkoutOverviewDataProps) {
    const [overview, setOverview] = useState<DataProps>();

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
    
    return(
        <div className="my-5">
            {overview ? 
            <div>
                <div className="flex row justify-between">
                    <Title text={overview.title} />
                    <div className="flex row gap-2">
                        <Button isSecondary = {true} >Edit</Button>
                        <Button isDanger = {true} >Delete</Button>
                    </div>
                    
                </div>
                
                <p>{overview.description}</p>
                <p>{`${overview.length} ${overview.unit}`}</p>
                <p>{overview.date}</p>
                <p>{overview.workout}</p>
            </div> 
            : "Loading data..."}
        </div>
    );
}