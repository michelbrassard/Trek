"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../dashboard/title";

import { useRouter } from 'next/navigation';
import Button from "../buttons/button";
import { Pencil, Trash2 } from "lucide-react";

interface CompetitionOverviewDataProps {
    id: string
}

interface CompetitionData {
    id: string,
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    location: string,
    url: string
}

export default function CompetitionOverviewData({id}: CompetitionOverviewDataProps) {
    const [overview, setOverview] = useState<CompetitionData>();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/proxy/competitions/${id}`, {
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
            await axios.delete(`http://localhost:3000/api/proxy/competitions/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error("Failed to delete competition:", error);
        }
        router.push("/dashboard/competitions");
    }
    
    return(
        <div className="my-5">
            {overview ? 
            <div>
                <div className="flex row justify-between">
                    <Title text={overview.title} />
                    <div className="flex row gap-2">
                        <Button isSecondary={true} onClick={handleEdit}>
                            Edit<Pencil size={16}/>
                        </Button>
                        <Button isDanger={true} onClick={handleDelete}>
                            Delete<Trash2 size={16} />
                        </Button>
                    </div>
                    
                </div>
                
                <p className="whitespace-pre">{overview.description}</p>
                <p>{overview.startDate} - {overview.endDate}</p>
                <p className="whitespace-pre">{overview.location}</p>
                <p>{overview.url}</p>
            </div> 
            : "Loading data..."}
        </div>
    );
}