"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { WorkoutOverviewType } from "./types";
import WorkoutListItem from "./workout-list-item";
import { motion } from "framer-motion";

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
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {attendanceList.map((workout) => (
                            <WorkoutListItem key={workout.id} data={workout} />
                        ))}
                    </motion.div> 
                    : 
                    <div>
                        <p className="text-center">No workouts found</p>
                    </div>
                }
            </div>
        </div>
    );
}