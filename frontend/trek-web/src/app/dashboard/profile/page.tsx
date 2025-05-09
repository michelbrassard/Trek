import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import LogOutButton from "@/app/ui/dashboard/logout-button";
import Title from "@/app/ui/dashboard/title";
import ProfileData from "@/app/ui/dashboard/welcome";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    return(
        <div>
            <Breadcrumbs />
            <Title text="Profile"/>
            <div className="py-4">
                <Link href={'/dashboard/settings'} className="flex items-center gap-2">
                    <Settings size={16} />
                    Settings
                </Link>
            </div>

            <div className="mb-3">
                <ProfileData />
            </div>
            
            
            <LogOutButton />
        </div>
    );
}