"use client"

import axios from "axios";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AthleteRowProps {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    date_of_birth: string
    phone: string

}

export default function AthletesTable() {
    const [tableData, setTableData] = useState<AthleteRowProps[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("/api/proxy/athletes", {
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
            <div className="rounded-md overflow-scroll border border-neutral-300 dark:border-neutral-700">
                <table className="w-full border-collapse border-neutral-300 dark:border-neutral-700">
                    <thead className="dark:bg-neutral-900 bg-neutral-100">
                        <tr>
                            <th className={headerCellStyling}>First Name</th>
                            <th className={headerCellStyling}>Last Name</th>
                            <th className={headerCellStyling}>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((athlete) => (
                            <tr key={athlete.id}>
                                <td className={cellStyling}>{athlete.first_name}</td>
                                <td className={cellStyling}>{athlete.last_name}</td>
                                <td className={cellStyling}>{athlete.email}</td>
                                <td className={cellStyling}>
                                    <Link href={`athletes/${athlete.id}`} className="float-end flex items-center gap-2 text-blue-500">
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
                <p className="text-center">No athletes found</p>
            </div>
            }
        </>
    );
}