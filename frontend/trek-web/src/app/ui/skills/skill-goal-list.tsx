'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../dashboard/title";
import ForceGraph from "./force-graph";
import MiniForceGraph from "./mini-force-graph";

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

    if (error) return <div>{error}</div>

    if (skillGoals) {
        return (
            <div className="my-5">
                <Title text={skillGoals.title} />
                <MiniForceGraph skillGoals={skillGoals} />
                <ForceGraph skillGoals={skillGoals} />
            </div>
        )
    }

    return (
        <div>Loading</div>
    )
}