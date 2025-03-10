"use client"

import axios from "axios";
import { useEffect, useState } from "react";

interface AthletesRowProps {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    date_of_birth: string
    phone: string

}

export default function Table() {
    const [tableData, setTableData] = useState<AthletesRowProps[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("/api/proxy/athletes", {
                withCredentials: true,
            });

            console.log(response.data)
            setTableData(response.data);
          } catch (error) {
            console.error("Failed to fetch data:", error);
          }
        };
    
        fetchData();
      }, []);
    
    //TODO: make it a better table and view the overview of each athlete
    return(
        <div>
            {tableData ? 
            <div>
                {tableData.map((athlete) => (
                    <div key={athlete.id} className="flex row gap-3">
                        <p>{athlete.first_name}</p>
                        <p>{athlete.last_name}</p>
                        <p>{athlete.email}</p>
                    </div>
                ))}
            </div> 
            : "Loading..."}
        </div>
    );
}