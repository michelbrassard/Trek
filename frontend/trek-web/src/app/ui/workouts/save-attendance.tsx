"use client"

import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Button } from "../buttons/button";

interface AthleteRowProps {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    date_of_birth: string
    phone: string

}

export default function WorkoutAttendance() {

    const [attendanceList, setAttendanceList] = useState<AthleteRowProps[]>([]);
    const [selectedAthletes, setSelectedAthletes] = useState<Set<string>>(new Set());
    const [isSaveButtonVisible, setSaveButtonVisibility] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("/api/proxy/athletes", {
                withCredentials: true,
            });
            setAttendanceList(response.data);
          } catch (error) {
            console.error("Failed to fetch data:", error);
          }
        };
    
        fetchData();
    }, []);

    const toggleSelection = (id: string) => {
        setSelectedAthletes((prev) => {
          const newSet = new Set(prev);
          setSaveButtonVisibility(true)
          if (newSet.has(id)) {
            newSet.delete(id)
          } else {
            newSet.add(id);
          }
          return newSet;
        });
      };

    return(
        <div>
            <p>Initial idea, proper fetching is needed, so that it is saved to the database</p>
            <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 mb-5">
                {attendanceList.map((athlete) => (
                    <div 
                        key={athlete.id} 
                        className={clsx(
                            "m-1 px-4 py-2 border rounded-xl transition-colors cursor-pointer overflow-x text-ellipsis",
                            selectedAthletes.has(athlete.id)
                                ? "border-green-500 bg-green-100 dark:bg-green-900"
                                : "border-neutral-300 dark:border-neutral-700 hover:border-blue-500 hover:bg-blue-50 hover:dark:bg-blue-950"
                            )}
                            onClick={() => toggleSelection(athlete.id)}
                    >
                        <p className="">{`${athlete.first_name} ${athlete.last_name}`}</p>
                        <p className="text-xs text-neutral-500">{athlete.email}</p>
                    </div>
                ))}
            </div>
            {isSaveButtonVisible && 
                <Button 
                    isPrimary={true}
                    onClick={()=> setSaveButtonVisibility(false)}
                >
                    Save
                </Button>
            }
            
        </div>
    )
}