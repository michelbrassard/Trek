"use client"

import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import InputSubmit from "../form/input-submit";

interface AthleteRowProps {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    date_of_birth: string
    phone: string

}

interface WorkoutAttendanceDataProps {
    id: string
}

type CurrentAttendant = {
    attendantId: string;
  };

export default function WorkoutAttendance({id} : WorkoutAttendanceDataProps) {
    const [athleteList, setAthleteList] = useState<AthleteRowProps[]>([]);
    const [selectedAthletes, setSelectedAthletes] = useState<Set<string>>(new Set());
    const [loadedAthletes, setLoadedAthletes] = useState<CurrentAttendant[]>();
    const [isSaveButtonVisible, setSaveButtonVisibility] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchAthletes = async () => {
          try {
            const response = await axios.get("/api/proxy/athletes", {
                withCredentials: true,
            });
            setAthleteList(response.data);
          } catch (error) {
            console.error("Failed to fetch data:", error);
          }
        };

        const fetchCurrentAttendance = async () => {
            try {
                const response = await axios.get(`/api/proxy/workouts/attendance/${id}`, {
                    withCredentials: true,
                });

                const fetchedAttendanceIds: CurrentAttendant[] = response.data
                setLoadedAthletes(fetchedAttendanceIds)
                const set = new Set(fetchedAttendanceIds.map((id) => id.attendantId));
                setSelectedAthletes(set)
              } catch (error) {
                console.error("Failed to fetch data:", error);
              }
        }
    
        fetchAthletes();
        fetchCurrentAttendance();
    }, [id]);

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

    const handleSaveAttendence = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaveButtonVisibility(false)
        
        const selectedAthletesList = Array.from(selectedAthletes)
        const loadedAthletesStringList = loadedAthletes?.map((id) => id.attendantId)
        const removeFalseAttendants = loadedAthletesStringList?.filter(id =>  !selectedAthletesList.includes(id))

        try {
            await axios.post("/api/proxy/workouts/attendance", 
                { attendance: {
                    workoutId: id,
                    list: selectedAthletesList
                } },
                { withCredentials: true }
            );
            
        } catch (error) {
            setError("Failed to save attendance")
            console.error(error)
        }

        try {
            await axios.delete(`/api/proxy/workouts/attendance/${id}`, {
                data: {
                    attendance: {
                        workoutId: id,
                        list: removeFalseAttendants
                    }
                },
                withCredentials: true
            });
            
        } catch (error) {
            setError("Failed to remove attendees")
            console.error(error)
        }
    }

    return(
        <form onSubmit={handleSaveAttendence} className="my-5">
            <h2 className="font-bold text-2xl mb-4">Attendance</h2>
            <div className="flex flex-wrap">
                {athleteList.map((athlete) => (
                    <div 
                        key={athlete.id} 
                        className={clsx(
                            "w-fit m-1 px-4 py-2 border rounded-xl transition-colors cursor-pointer overflow-x text-ellipsis",
                            selectedAthletes.has(athlete.id)
                                ? "border-green-500 bg-green-100 dark:bg-green-900"
                                : "border-neutral-300 dark:border-neutral-700 hover:border-blue-500 hover:bg-blue-50 hover:dark:bg-blue-950"
                            )}
                            onClick={() => toggleSelection(athlete.id)}
                    >
                        <p className="text-sm">{`${athlete.first_name} ${athlete.last_name}`}</p>
                        <p className="text-xs text-neutral-500">{athlete.email}</p>
                    </div>
                ))}
            </div>
            {isSaveButtonVisible && 
                <div className="w-fit">
                    <InputSubmit 
                        name={"submit"}
                        id={"submit"}
                        value={"Save"} 
                    />
                </div>
            }
            {error && <p className="text-red-500">{error}</p>}
        </form>
    )
}