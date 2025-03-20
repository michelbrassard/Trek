"use client"

import { LogOut} from "lucide-react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { clsx } from "clsx";

interface LogOutButtonProps {
    isDesktop: boolean
}

export default function LogOutButton({isDesktop}: LogOutButtonProps) {
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
            className={clsx(isDesktop ? 
                "border border-opacity-0 rounded-xl transition-all flex items-center gap-2 py-2 px-4 hover:text-red-500 border-red-400 dark:border-red-600 hover:border-opacity-100" 
                : 
                "text-3xl font-medium hover:underline pb-5 pt-4 w-full text-left")}
            onClick={handleLogout}
        >
            {isDesktop && <LogOut size={16} />}
            <span className="">Log out</span>
        </button>
    );
}