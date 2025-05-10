'use client'

import Button from "../buttons/button"

import { useState } from "react"
import WorkoutOverviewList from "./workout-overview-list"
import WorkoutCalendar from "./overview-calendar"

export default function WorkoutOverviewPicker() {
    const [overviewType, setOverviewType] = useState('list')

    const handleTypeSwitch = (type: string) => {
        setOverviewType(type)
    }
    
    return(
        <div>
            <div className="flex flex-row gap-2 relative">
                <Button onClick={() => handleTypeSwitch("list")}>List</Button>
                <Button onClick={() => handleTypeSwitch("calendar")}>Calendar</Button>
            </div>
            {
                overviewType === 'list' ? 
                <WorkoutOverviewList />
                :
                <WorkoutCalendar />
            }
        </div>
    ) 
}