'use client'

import { useMemo } from "react"
import TonalButton from "../buttons/tonal-button"

interface ProgressProps {
    contents: Content[]
}

interface Content {
    createdAt: string,
    content: string
}

interface Item {
    type: string,
    prev: string,
    current: string
}

export default function VisualizeProgress({contents}: ProgressProps) {
    const progressItems: Item[] = useMemo(() => {
        const currentLines = contents[0].content.split("\n");
        const lastLines = contents[1].content.split("\n");

        const baseItems = currentLines.map((line, index) => {
            const prev = lastLines[index];
            if (typeof prev === 'undefined') {
                return {
                    type: "addition",
                    prev: "",
                    current: line,
                };
            }
            if (prev.trim() !== line.trim()) {
                return {
                    type: "change",
                    prev,
                    current: line,
                };
            }
            return {
                    type: "same",
                    prev,
                    current: line,
                };
        }).filter((item): item is Item => item !== null);

        return [...baseItems];
    }, [contents]);

    const refactorDateTime = (dateTime: string) => {
        const removedT = dateTime.replaceAll("T", " ")
        const removedMilliSeconds = removedT.split(".")[0]
        const split = removedMilliSeconds.split(" ")
        const date = split[0].replaceAll("-", "/")
        const time = split[1]
        return (
            <div className="text-sm">
                <p>{date}</p>
                <p className="text-neutral-500">{time}</p>
            </div>
        )
    }

    console.log(contents)

    return(
        <div>
            <div className="flex flex-row gap-4 overflow-x-scroll max-w-[600px] my-3">
                {
                    contents.map((item, index) => (
                        <div key={index}>
                            <TonalButton isPrimary={true}>
                                {refactorDateTime(item.createdAt)}
                            </TonalButton>
                        </div>
                    ))
                }
            </div>
            {
                progressItems.map((item, index) => {
                    if (item.type === "addition") {
                        return <p key={index} className="bg-green-500/20">{item.current + " "}</p>
                    }
                    else if (item.type === "change") {
                        return (
                            <div key={index} className="my-2">
                                <p className="bg-neutral-500/20 whitespace-pre text-neutral-500 text-sm">{item.prev + " "}</p>
                                <p className="bg-green-500/20 whitespace-pre">{item.current + " "}</p>
                            </div>
                        )
                    }
                    else if (item.type === "same") {
                        return <p key={index}>{item.current}</p>
                    }
                        
                    
                })
            }
        </div>
    )
}