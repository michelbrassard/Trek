"use client"

import axios from "axios";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface WorkoutRowProps {
    id: string,
    title: string,
    description: string,
    workout: string,
    length: number,
    unit: string,
    date: string
}

export default function WorkoutsTable() {
    const [tableData, setTableData] = useState<WorkoutRowProps[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("/api/proxy/workouts", {
                withCredentials: true,
            });
            setTableData(response.data);
          } catch (error) {
            console.error("Failed to fetch data:", error);
          }
        };
    
        fetchData();
      }, []);
    
    //TODO: make it a better table and view the overview of each athlete
    const cellStyling = "border-t border-collapse px-4 py-2 border-neutral-300 dark:border-neutral-700 text-left";
    const headerCellStyling = "px-4 py-2 text-left text-nowrap"
    return(
        <>
            {tableData.length != 0 ? 
            <div className="my-5 rounded-md overflow-scroll border border-neutral-300 dark:border-neutral-700">
                <table className="w-full border-collapse border-neutral-300 dark:border-neutral-700">
                    <thead className="dark:bg-neutral-900 bg-neutral-100">
                        <tr>
                            <th className={headerCellStyling}>Title</th>
                            <th className={headerCellStyling}>Description</th>
                            <th className={headerCellStyling}>Length</th>
                            <th className={headerCellStyling}>Unit</th>
                            <th className={headerCellStyling}>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((workout) => (
                            <tr key={workout.id}>
                                <td className={cellStyling}>{workout.title}</td>
                                <td className={cellStyling}>{workout.description}</td>
                                <td className={cellStyling}>{workout.length}</td>
                                <td className={cellStyling}>{workout.unit}</td>
                                <td className={cellStyling}>{workout.date}</td>
                                <td className={cellStyling}>
                                    <Link href={`workouts/${workout.id}`} className="float-end flex items-center gap-2 text-blue-500">
                                        Details <ArrowRight size={16} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> 
            </div> 
            : 
            <div>
                <p className="text-center">No workouts found</p>
            </div>
            }
        </>
    );
}