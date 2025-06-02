'use client'

import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import MiniForceGraph from "./mini-force-graph";
import { Plus } from "lucide-react";

interface Prerequisite {
    id: string
}

interface Goal {
    id: string,
    title: string,
    description: string,
    isCompleted: boolean
    prerequisites: Prerequisite[]
}

interface Skill {
    id: string,
    title: string,
    description: string
    goals: Goal[]
}

export default function SkillsOverview() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/proxy/skills`, {
                    withCredentials: true,
                });
                setSkills(response.data)
            
            } catch (error) {
                setError("Unable to load skills.")
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData();
    }, [])

    if (error) return <div>{error}</div>

    if (skills) {
        const angleStep = 360 / skills.length;
        const radius = 200

        return (
            <div className="flex items-center justify-center bg-[radial-gradient(circle,_#ddd_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#222_1px,_transparent_1px)] [background-size:20px_20px] rounded-xl p-12">
                <motion.div
                    className="relative m-12 rounded-full border border-neutral-200 dark:border-neutral-800"
                    initial={{ width: (radius - 50) * 2, height: (radius - 50) * 2, opacity: 0 }}
                    animate={{ width: radius * 2, height: radius * 2, opacity: 1 }}
                    exit={{ width: (radius - 50) * 2, height: (radius - 50) * 2, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {skills.map((skill, index) => {
                        const angle = angleStep * index;
                        const x = Math.round((radius + radius * Math.sin((angle * Math.PI) / 180) - 60) * 1000) / 1000;
                        const y = Math.round((radius + radius * -Math.cos((angle * Math.PI) / 180) - 60) * 1000) / 1000;
                        return (
                            <motion.div
                                key={index}
                                className="absolute z-10"
                                style={{
                                    left: `${x}px`,
                                    top: `${y}px`,
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Link
                                    href={`skills/${skill.id}`}
                                    className="rounded-2xl w-[120px] h-[120px] bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                                    style={{
                                        transform: `rotate(${angle}deg)`,
                                        transformOrigin: "center center",
                                    }}
                                >
                                    <div className="relative">
                                        <MiniForceGraph skillGoals={skill} />
                                        <p
                                            style={{
                                                transform: `rotate(${-angle}deg)`,
                                                transformOrigin: "center center",
                                            }}
                                            className="z-10 absolute inset-0 flex items-center justify-center"
                                        >
                                            {skill.title}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                    <div className="w-full h-full absolute flex items-center justify-center text-center text-neutral-500">
                        <div>
                            <h1 className="bg-white dark:bg-black text-xl rounded-full">
                                Skills
                            </h1>
                            <Link href={'skills/create'} >
                                <div className="flex items-center gap-2 text-blue-500">
                                    <Plus size={16}/> New
                                </div>
                            </Link>
                        </div>
                        
                    </div>
                </motion.div>
            </div>
        )
    }
}