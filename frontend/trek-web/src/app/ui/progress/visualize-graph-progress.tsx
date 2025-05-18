'use client'

import { useMemo } from "react"

interface ProgressProps {
    contents: Content[]
}

interface Content {
    createdAt: string,
    content: string
}

interface Item {
    type: string,
    prevDate: string,
    currentDate: string,
    prev: string,
    current: string
}

interface VersionChangesByDate {
    currentDate: string,
    prevDate: string,
    items: Item[]
}

export default function VisualizeGraphProgress({contents}: ProgressProps) {

    const progressItems: VersionChangesByDate[] = useMemo(() => {
        const getProgressItems = (prevIndex: number, currentIndex: number) => {
            const currentLines = contents[currentIndex].content.split("\n");
            const prevLines = contents[prevIndex].content.split("\n");
            
            const baseItems = currentLines.map((line, index) => {
                const prev = prevLines[index];
                if (typeof prev === 'undefined') {
                    return { type: "addition", prev: "", current: line };
                }
                if (prev !== line) {
                    return { type: "change", prev, current: line, };
                }
                if (prev === line && prevIndex === currentIndex) {
                    return { type: "initial", prev, current: line, };
                }
                if (prev === line) {
                    return { type: "same", prev, current: line, };
                }
                
                return { type: "change", prev, current: line, };
            }).filter((item): item is Item => item !== null);
            return [...baseItems];
        }

        return contents.map((_, index) => {
            if(typeof contents[index + 1] !== 'undefined') {
                return {
                    currentDate: contents[index].createdAt,
                    prevDate: contents[index + 1].createdAt,
                    items: getProgressItems(index + 1, index)
                }
            }
            //return as same so that no changes are shown
            return {
                currentDate: contents[index].createdAt,
                prevDate: contents[index].createdAt,
                items: getProgressItems(index, index)
            }
        })
    }, [contents]);

    const refactorDateTime = (dateTime: string) => {
        const removedT = dateTime.replaceAll("T", " ")
        const removedMilliSeconds = removedT.split(".")[0]
        const split = removedMilliSeconds.split(" ")
        const date = split[0].replaceAll("-", "/")
        const time = split[1]
        return (
            <p>{date}: {time}</p>
        )
    }

    return(
        <>
            <p>Experimental?</p>
            <div className="flex flex-row gap-2 w-[700px] overflow-x-scroll">
                {progressItems.map((item, index) => (
                    <div key={index}>
                        <div className="text-sm">
                            {refactorDateTime(item.currentDate)}
                        </div>
                        {
                            item.items.map((block, index) => (
                                block.type !== 'same' &&
                                <div
                                    key={index} 
                                    className="bg-green-500/30 my-1 p-1 text-xs capitalize text-green-700" 
                                >
                                    {block.type}
                                </div>
                            ))
                        }
                    </div>
                ))}
            </div>
        </>
    )
}