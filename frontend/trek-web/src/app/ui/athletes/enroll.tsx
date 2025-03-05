"use client"

import axios from "axios";
import { useEffect, useState } from "react";

interface TemporaryCoachCodeProps {
    id: string,
    createdAt: string,
    coachID: string
}

export default function Enroll() {
    const [data, setData] = useState<TemporaryCoachCodeProps>();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:8000/enroll/temporaryCodes", {
                withCredentials: true,
            });
            setData(response.data);
          } catch (error) {
            console.error("Failed to fetch data:", error);
          }
        };
    
        fetchData();
      }, []);

      return (
        <div>
            {data ? 
            <div>
                <p>{data?.id}</p>
                <p>{data?.createdAt}</p>
                <p>{data?.coachID}</p>
            </div>
            : "No codes..."}
        </div>
      );
}