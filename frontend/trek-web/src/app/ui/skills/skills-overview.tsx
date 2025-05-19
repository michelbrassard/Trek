'use client'

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Skill {
    id: string,
    title: string,
    description: string
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
        const radius = 230

        return (
            <div 
                className="flex items-center justify-center bg-[radial-gradient(circle,_#ddd_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#222_1px,_transparent_1px)] [background-size:20px_20px] rounded-xl p-12"
            >
                <div
                    className="relative m-12 rounded-full border-2 border-neutral-500/30"
                    style={{ width: radius * 2, height: radius * 2 }}
                >
                    {skills.map((skill, index) => {
                        const angle = angleStep * index;
                        const x = Math.round((radius + radius * Math.sin((angle * Math.PI) / 180) - 75) * 1000) / 1000;
                        const y = Math.round((radius + radius * -Math.cos((angle * Math.PI) / 180) - 70) * 1000) / 1000;
                        return (
                            <div
                                key={index}
                                className="absolute z-10"
                                style={{
                                    left: `${x}px`,
                                    top: `${y}px`,
                                }}
                            >
                                <Link
                                    href={`skills/${skill.id}`}
                                    className="rounded-xl w-[150px] h-[150px] bg-blue-500 hover:bg-blue-400 text-white flex items-center justify-center transition-colors duration-200  cursor-pointer"
                                    style={{
                                        transform: `rotate(${angle}deg)`,
                                        transformOrigin: "center center",
                                    }}
                                >
                                    <p
                                        style={{
                                            transform: `rotate(${-angle}deg)`,
                                            transformOrigin: "center center",
                                        }}
                                    >
                                        {skill.title}
                                    </p>
                                </Link>
                            </div>
                        );
                    })}
                    <div className="w-full h-full absolute flex items-center justify-center text-center text-neutral-500">
                        <p className="bg-white dark:bg-black text-xl rounded-full">
                            Skills
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}