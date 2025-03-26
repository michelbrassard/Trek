"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { AttendanceOverviewType } from "./types";
import AttendanceListItem from "./attendance-list-item";

export default function AttendanceOverview() {
    const [attendanceList, setAttendanceList] = useState<AttendanceOverviewType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/proxy/attendance`, {
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
                            <AttendanceListItem key={workout.id} data={workout} />
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