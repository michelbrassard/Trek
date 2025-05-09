"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import CompetitionListItem from "./competition-list-item";
import { motion } from "framer-motion";
import { CompetitionOverviewType } from "./types";

export default function WorkoutOverviewList() {
    const [attendanceList, setAttendanceList] = useState<CompetitionOverviewType[]>([])

    useEffect(() => {
        const fetchCompetitionsWithAttendees = async () => {
            try {
                const response = await axios.get(`/api/proxy/competitions/attendance`, {
                    withCredentials: true,
                });
                setAttendanceList(response.data)
            
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        
        fetchCompetitionsWithAttendees();
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
                        {attendanceList.map((competition) => (
                            <CompetitionListItem key={competition.id} competition={competition} />
                        ))}
                    </motion.div> 
                    : 
                    <div>
                        <p className="text-center">No competitions found</p>
                    </div>
                }
            </div>
        </div>
    );
}