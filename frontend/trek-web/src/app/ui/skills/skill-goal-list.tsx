'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../dashboard/title";

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
    prerequisites: Prerequisite[]
}

interface SkillGoals {
    id: string,
    title: string,
    description: string,
    goals: Goal[]
}

interface Edge {
    from: string,
    to: string
}

interface Node {
    id: string,
    x: number,
    y: number
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

    const generateHierarchicalMap = (skillGoals: SkillGoals) => {
        const goalsMap = new Map(skillGoals.goals.map(goal => [goal.id, goal]));
        
        const nodes: Node[] = skillGoals.goals.map(goal => (
            {id: goal.id, x: Math.random() * 400, y: Math.random() * 400}
        ))
        const edges: Edge[] = skillGoals.goals.flatMap(goal =>
            goal.prerequisites.map(prereq => (
                {from: prereq.id, to:goal.id}
            ))
        );
        
        console.log(nodes)
        console.log(edges)
    }

    if (skillGoals) {
        generateHierarchicalMap(skillGoals!)
    }

    if (error) return <div>{error}</div>

    if (skillGoals) return (
        <div className="my-5">
            <Title text={skillGoals.title} />
            <div className="p-12 bg-[radial-gradient(circle,_#ddd_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#222_1px,_transparent_1px)] [background-size:20px_20px]">
                {
                    skillGoals.goals.map((goal, index) => (
                        <div key={index} className="bg-neutral-500/20 p-3 m-2">{goal.title}</div>
                    ))
                }
            </div>
        </div>
    )

    return (
        <div>Loading</div>
    )
}