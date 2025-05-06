'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';

interface UserProps {
    id: string,
    first_name: string,
    last_name: string,
    username: string,
    role: string,
    phone: string,
    email: string,
    date_of_birth: string
}

export default function ProfileData() {
  const [data, setData] = useState<UserProps>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/proxy/users", {
            //THE COMPONENT HAS TO USE CLIENT
            withCredentials: true, // Include credentials (cookies) 
        });
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      {data ? 
      <div>
        <p>ID: {data.id}</p>
        <p>First name: {data.first_name}</p>
        <p>Last name: {data.last_name}</p>
        <p>Username: {data.username}</p>
        <p>Role: {data.role}</p>
        <p>Phone: {data.phone}</p>
        <p>Email: {data.email}</p>
        <p>DOB: {data.date_of_birth}</p>
      </div> : 'Loading data...'}
    </div>
  );
}