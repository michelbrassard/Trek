'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../dashboard/title";
import VisualizeTextProgress from "./visualize-text-progress";
import VariableButton from "../buttons/variable-button";
import { ChartColumn, Text } from "lucide-react";
import VisualizeGraphProgress from "./visualize-graph-progress";

interface ProgressVersionDataProps {
    id: string
}

interface Content {
    createdAt: string,
    content: string
}

interface ProgressVersionsType {
    id: string,
    title: string,
    description: string
    contents: Content[]
}

export default function ProgressVersions({id}: ProgressVersionDataProps) {
    const [error, setError] = useState("");
    const [progressVersions, setProgressVersions] = useState<ProgressVersionsType>()
    const [overviewType, setOverviewType] = useState('text')

    const handleTypeSwitch = (type: string) => {
        setOverviewType(type)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/proxy/progress/${id}/versions`, {
                    withCredentials: true,
                });
                setProgressVersions(response.data)
            } catch (error) {
                setError("Unable to get versions")
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData()
    }, [id]);

    if (error) return(<div>{error}</div>)

    return(
        progressVersions ? 
            <div>
                <Title text={progressVersions.title} />
                <p className="text-sm text-neutral-500">{progressVersions.description}</p>
                <div className="flex flex-row gap-2 relative my-2">
                    <VariableButton
                        isSecondary={overviewType !== 'text'} 
                        isFilled={overviewType === 'text'}
                        isPrimary={overviewType === 'text'}
                        onClick={() => handleTypeSwitch("text")}
                    >
                        <Text size={16} className="my-1" />
                    </VariableButton>
                    <VariableButton
                        isSecondary={overviewType !== 'chart'} 
                        isFilled={overviewType === 'chart'}
                        isPrimary={overviewType === 'chart'}
                        onClick={() => handleTypeSwitch("chart")}
                    >
                        <ChartColumn size={16} className="my-1" />
                    </VariableButton>
                </div>
                {
                    overviewType === 'text' ? 
                    <VisualizeTextProgress contents={progressVersions.contents} />
                    :
                    <VisualizeGraphProgress contents={progressVersions.contents} />
                }
            </div>
            :
            <div>Loading data...</div>
    )
}