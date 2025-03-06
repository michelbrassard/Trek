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
          if (response.status === 201) {
            setData((prevData) => [...prevData, response.data]);
          }
          
        } catch (error) {
          console.error("Failed to create new code:", error);
        }
      }

      return (
        <div>
            {data ? 
            <div>
                {data.map((item) => (
                    <div key={item.id}>
                        <p>Code: {item.id}</p> 
                        <p>Created at: {item.createdAt}</p> 
                        <p>Coach ID: {item.coachID}</p>
                        <hr></hr>
                        <a href={`http://localhost:3000/signup?enroll=${item.id}`}>http://localhost:3000/signup?enroll={item.id}</a>
                    </div>
                ))}
            </div> : "No codes"}

            <Button 
              isPrimary = {true}
              onClick={handleGenerateCode}
            >
              Generate code
            </Button> 
        </div>
      );
}