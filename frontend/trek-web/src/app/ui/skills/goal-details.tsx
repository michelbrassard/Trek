'use client'

import axios from "axios";
import Title from "../dashboard/title"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TonalButton from "../buttons/tonal-button";
import { Pencil, Trash2 } from "lucide-react";

interface GoalDetailsProps {
    skillId: string
    goalId: string
}

interface Prerequisite {
    id: string,
    title: string
    description: string,
    isCompleted: boolean
}

interface PrerequisiteObject {
    prerequisiteGoalId: Prerequisite
}

interface Goal {
    id: string,
    title: string,
    description: string,
    isCompleted: boolean
    prerequisites: PrerequisiteObject[]
}

export default function GoalDetailsOverview({skillId: id, goalId}: GoalDetailsProps) {
    const [goalDetails, setGoalDetails] = useState<Goal>();
    const [error, setError] = useState('')
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/proxy/skills/${id}/${goalId}`, {
                    withCredentials: true,
                });
                setGoalDetails(response.data)
            
            } catch (error) {
                setError("Failed to fetch goal data")
                console.error("Failed to fetch data:", error);
            }
        };

    fetchData();
    }, [goalId, id]);

    const handleEdit = () => {
        router.push(`${goalId}/edit`);
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/proxy/skills/${id}/${goalId}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error("Failed to delete goal:", error);
        }
        router.push(`/dashboard/skills/${id}`);
    }

    if (error) return <div>{error}</div>

    if (goalDetails) return(
        <div className="my-5">
                <div className="flex row justify-between">
                    <Title text={goalDetails.title} />
                    <div className="flex row gap-2">
                        <TonalButton isSecondary={true} onClick={handleEdit}>
                            Edit<Pencil size={16}/>
                        </TonalButton>
                        <TonalButton isDanger={true} onClick={handleDelete}>
                            Delete<Trash2 size={16} />
                        </TonalButton>
                    </div>
                </div>
            <div>
                <p>{goalDetails.description}</p>
                <p className="mb-2 font-bold">Prerequisites:</p>
                <div className="flex flex-wrap">
                    {goalDetails.prerequisites && goalDetails.prerequisites.map((prerequisite, index) => (
                        <div key={index} className="py-2 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-900">
                            <p className="font-bold capitalize">{prerequisite.prerequisiteGoalId.title}</p>
                            <p>{prerequisite.prerequisiteGoalId.description}</p>
                            {prerequisite.prerequisiteGoalId.isCompleted ? <p className="text-green-500">Completed</p> : <p>Has to be completed first!</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}