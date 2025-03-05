"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../button";

interface TemporaryCoachCodeProps {
    id: string,
    createdAt: string,
    coachID: string
}

export default function Enroll() {
    const [data, setData] = useState<TemporaryCoachCodeProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:3000/api/proxy/temporary_coach_codes", {
                withCredentials: true,
            });

            console.log(response.data)
            setData(response.data);
          } catch (error) {
            console.error("Failed to fetch data:", error);
          }
        };
    
        fetchData();
      }, []);

      const handleGenerateCode = async () => {
        try {
          const response = await axios.post("http://localhost:3000/api/proxy/temporary_coach_codes", {
              withCredentials: true,
          });
          setData((prevData) => [...prevData, response.data]);
        } catch (error) {
          console.error("Failed to create new code:", error);
        }
      }

      return (
        <div>
            {data ? 
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        {item.id} - {item.createdAt} - {item.coachID}
                    </li>
                ))}
            </ul> : "No codes"}

            <Button 
              isPrimary = {true}
              onClick={handleGenerateCode}
            >
              Generate code
            </Button> 
        </div>
      );
}