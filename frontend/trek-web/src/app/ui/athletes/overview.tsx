"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../dashboard/title";

interface AthleteOverviewDataProps {
    id: string
}

interface DataProps {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    date_of_birth: string
    phone: string
}

export default function AthleteOverviewData({id}: AthleteOverviewDataProps) {
    const [overview, setOverview] = useState<DataProps>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/proxy/athletes/${id}`, {
                    withCredentials: true,
                });
                setOverview(response.data)
            
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

    fetchData();
    }, []);
    
    return(
        <div className="my-5">
            {overview ? 
            <div>
                <Title text={`${overview.first_name} ${overview.last_name}`} />
                <p>{overview.username}</p>
                <p>{overview.email}</p>
                <p>{overview.phone}</p>
                <p>{overview.date_of_birth}</p>
            </div> 
            : "Loading data..."}
        </div>
    );
}