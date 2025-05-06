"use client"

import { LogOut} from "lucide-react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Button from "../buttons/button";

export default function LogOutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:8000/auth/logout", {}, {withCredentials: true,});
            if (response.status === 200) {
                router.push('/')
            }
          } catch (error) {
            console.error("Failed to log out", error);
          }
    }

    return(
        <Button isDanger={true} onClick={handleLogout}>
            <LogOut size={16} />Log out
        </Button>
    );
}