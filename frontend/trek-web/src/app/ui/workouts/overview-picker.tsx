'use client'

import VariableButton from "../buttons/variable-button"

import { useState } from "react"
import WorkoutOverviewList from "./workout-overview-list"
import WorkoutCalendar from "./overview-calendar"
import { Calendar, List } from "lucide-react"

export default function WorkoutOverviewPicker() {
    const [overviewType, setOverviewType] = useState('list')

    const handleTypeSwitch = (type: string) => {
        setOverviewType(type)
    }
    
    return(
        <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-1 relative">
                <VariableButton
                    isSecondary={overviewType !== 'list'} 
                    isFilled={overviewType === 'list'}
                    isPrimary={overviewType === 'list'}
                    onClick={() => handleTypeSwitch("list")}
                >
                    <List size={16} className="my-1" />
                </VariableButton>
                <VariableButton
                    isSecondary={overviewType !== 'calendar'} 
                    isFilled={overviewType === 'calendar'}
                    isPrimary={overviewType === 'calendar'}
                    onClick={() => handleTypeSwitch("calendar")}
                >
                    <Calendar size={16} className="my-1" />
                </VariableButton>
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