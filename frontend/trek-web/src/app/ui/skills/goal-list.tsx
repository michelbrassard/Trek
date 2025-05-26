'use client'

import { useEffect, useState } from "react"
import Title from "../dashboard/title"
import axios from "axios"
import Link from "next/link"

interface GoalListProps {
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

export default function GoalList({ id }: GoalListProps) {
    const [goals, setGoals] = useState<Goal[]>();
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/proxy/skills/${id}/goals`, {
                    withCredentials: true,
                });
                setGoals(response.data)
            
            } catch (error) {
                setError('Unable to fetch skill and its goals')
                console.error("Failed to fetch skill and its goals:", error);
            }
        };

        fetchData();
    }, [id])

    if (error) return <div>{error}</div>

    if (goals) return (
        <div className="my-5">
            <Title text="Goals" />
            <div className="flex flex-wrap gap-3">
                {goals.map(goal => (
                    <Link key={goal.id} href={`goals/${goal.id}`}>
                        <div className="flex flex-row gap-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 hover:dark:bg-neutral-800 transition-all p-2 px-4 rounded-xl">
                            <p className="font-bold">{goal.title}</p>
                            <p>{goal.description}</p>
                            {goal.isCompleted && <p className="text-green-500">Completed</p>}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}