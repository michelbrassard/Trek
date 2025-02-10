import Link from "next/link"
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";
import TrekLogo from "../trek-logo";

export default function SideNav() {

    const baseStyle = 'py-2 px-4 rounded-xl text-base font-medium hover:bg-gray-800 transition-colors flex items-center gap-2'

    return (
        <nav className="w-60 flex flex-col justify-between gap-8">
            
            <div className="flex flex-col gap-2">
                <div className="px-4">
                    <TrekLogo />
                </div>
                <Link href="/" className={baseStyle}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link href="/" className={baseStyle}>
                    <Users size={20} />
                    <span>Athletes</span>
                </Link>
            </div>
            <div className="flex flex-col gap-2">
                <Link href="/" className={baseStyle}>
                    <LogOut size={20} />
                    <span className="">Log out</span>
                </Link>
                <Link href="/" className={baseStyle}>
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
                
            </div>
        </nav>
    )
}