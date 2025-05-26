'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../dashboard/title";
import ForceGraph from "./force-graph";
import TonalButton from "../buttons/tonal-button";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from 'next/navigation';

interface SkillGoalsDataProps {
    id: string
}

interface Prerequisite {
    id: string
}

interface Goal {
    id: string,
    title: string,
    description: string,
    isCompleted: boolean,
    prerequisites: Prerequisite[]
}

interface SkillGoals {
    id: string,
    title: string,
    description: string,
    goals: Goal[]
}

export default function SkillGoalList({id}: SkillGoalsDataProps) {
    const [skillGoals, setSkillGoals] = useState<SkillGoals>();
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/proxy/skills/${id}`, {
                    withCredentials: true,
                });
                setSkillGoals(response.data)
            
            } catch (error) {
                setError('Unable to fetch skill and its goals')
                console.error("Failed to fetch skill and its goals:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleEdit = () => {
        router.push(`${id}/edit`);
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/proxy/skills/${id}/detail`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error("Failed to delete workout:", error);
        }
        router.push("/dashboard/skills");
    }

    if (error) return <div>{error}</div>

    if (skillGoals) {
        return (
            <div className="my-5">
                <div className="flex row justify-between">
                    <Title text={skillGoals.title} />
                    <div className="flex row gap-2">
                        <TonalButton isSecondary={true} onClick={handleEdit}>
                            Edit<Pencil size={16}/>
                        </TonalButton>
                        <TonalButton isDanger={true} onClick={handleDelete}>
                            Delete<Trash2 size={16} />
                        </TonalButton>
                    </div>
                </div>
                <p>{skillGoals.description}</p>
                <ForceGraph skillGoals={skillGoals} />
            </div>
        )
    }

    return (
        <div>Loading</div>
    )
}