'use client'

import { useMemo, useRef, useState } from "react"
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

export default function VisualizeTextProgress({contents}: ProgressProps) {
    const [selectedIndices, setSelectedIndices] = useState<[number, number]>([1, 0]);
    const [selectedDate, setSelectedDate] = useState(contents[0].createdAt)
    
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isScrollStart, setIsScrollStart] = useState(true)
    const [isScrollEnd, setIsScrollEnd] = useState(true)
    
    const handleScroll = () => {
        const scrollX = scrollRef.current?.scrollLeft ?? 0;

        const clientWidth = scrollRef.current?.clientWidth ?? 0
        const scrollWidth = scrollRef.current?.scrollWidth ?? 0
        const maxY = scrollWidth - clientWidth

        if (scrollX === 0) {
            setIsScrollStart(true)
            setIsScrollEnd(false)
        }
        else if (scrollX > 0 && scrollX < maxY) {
            setIsScrollStart(false)
            setIsScrollEnd(false)
        }
        else if(scrollX === maxY) {
            setIsScrollStart(false)
            setIsScrollEnd(true)
        }
    };

    const progressItems: Item[] = useMemo(() => {
        const getProgressItems = (last: string, current: string) => {
            const currentLines = current.split("\n");
            const lastLines = last.split("\n");

            const baseItems = currentLines.map((line, index) => {
                const prev = lastLines[index];
                if (typeof prev === 'undefined') {
                    return { type: "addition", prev: "", current: line, };
                }
                if (prev.trim() !== line.trim()) {
                    return { type: "change", prev, current: line, };
                }
                if (prev === line && selectedIndices[0] === selectedIndices[1]) {
                    return { type: "initial", prev, current: line, };
                }
                else if (prev === line) {
                    return { type: "same", prev, current: line, };
                }
                
                return { type: "change", prev, current: line, };
            }).filter((item): item is Item => item !== null);
            return [...baseItems];
        }
        const [prevIndex, currentIndex] = selectedIndices;
        return getProgressItems(contents[prevIndex].content, contents[currentIndex].content);
    }, [selectedIndices, contents]);

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

    const pickDate = (date: string) => {
        setSelectedDate(date)
        const current = contents.findIndex(item => item.createdAt === date)
        const prev = current + 1

        if(prev === contents.length) {
            setSelectedIndices([current, current])
        }
        else {
            setSelectedIndices([prev, current])
        }
    }

    return(
        <div className="">
            <div className="relative my-3 max-w-[400px] lg:max-w-[600px] overflow-hidden">
                {!isScrollStart && <div className="absolute left-0 top-0 h-full w-[20px] z-1 pointer-events-none bg-gradient-to-r from-white dark:from-neutral-950 to-transparent" />}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex flex-row gap-2 overflow-x-scroll z-0"
                >
                    {
                        contents.map((item, index) => (
                            <div key={index}>
                                <TonalButton 
                                    isPrimary={item.createdAt === selectedDate}
                                    isSecondary={item.createdAt !== selectedDate}
                                    onClick={() => pickDate(item.createdAt)}
                                >
                                    {refactorDateTime(item.createdAt)}
                                </TonalButton>
                            </div>
                        ))
                    }
                </div>
                {!isScrollEnd && <div className="absolute right-0 top-0 h-full w-[20px] z-1 pointer-events-none bg-gradient-to-l from-white dark:from-neutral-950 to-transparent" />}
            </div>
            {
                progressItems.map((item, index) => {
                    if (item.type === "addition") {
                        return <p key={index} className="bg-green-500/20 whitespace-pre">{item.current + " "}</p>
                    }
                    else if (item.type === "change") {
                        return (
                            <div key={index} className="my-2">
                                <p className="bg-neutral-500/20 whitespace-pre text-neutral-500 text-sm">{item.prev + " "}</p>
                                <p className="bg-green-500/20 whitespace-pre">{item.current + " "}</p>
                            </div>
                        )
                    }
                    else if (item.type === "same" || item.type === 'initial') {
                        return <p key={index} className="whitespace-pre">{item.current + " "}</p>
                    }
                })
            }
        </div>
    )
}