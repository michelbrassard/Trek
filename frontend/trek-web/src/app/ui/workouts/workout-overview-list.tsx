"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { WorkoutOverviewType } from "./types";
import WorkoutListItem from "./workout-list-item";

export default function WorkoutOverviewList() {
    const [attendanceList, setAttendanceList] = useState<WorkoutOverviewType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/proxy/attendance`, {
                    withCredentials: true,
                });
                setAttendanceList(response.data)
            
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);
    
    return(
        <div className="my-5">
            <div>
                {attendanceList.length != 0 ? 
                    <div>
                        {attendanceList.map((workout) => (
                            <WorkoutListItem key={workout.id} data={workout} />
                        ))}
                    </div> 
                    : 
                    <div>
                        <p className="text-center">No attendance data found</p>
                    </div>
                }
            </div>
        </div>
    );
}