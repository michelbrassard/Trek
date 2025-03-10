"use client"

import { LogOut} from "lucide-react";
import axios from "axios";
import { useRouter } from 'next/navigation';

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
        <button 
            className="border border-opacity-0 rounded-xl transition-all flex items-center gap-2 py-2 px-4 hover:text-red-500 border-red-500 hover:border-opacity-100"
            onClick={handleLogout}
        >
            <LogOut size={16} />
            <span className="">Log out</span>
        </button>
    );
}