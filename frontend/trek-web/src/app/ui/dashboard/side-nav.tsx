import Link from "next/link"
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";
import TrekLogo from "../trek-logo";

export default function SideNav() {

    const baseStyle = 'py-2 px-4 rounded-xl text-base font-medium hover:bg-neutral-600 transition-colors flex items-center gap-2'

    return (
        <nav className="w-60 flex flex-col justify-between gap-8 bg-neutral-800 h-screen p-4">
            <div className="flex flex-col gap-2">
                <div className="px-4 mb-5 mt-2">
                    <TrekLogo />
                </div>
                <Link href="/dashboard" className={baseStyle}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link href="/dashboard/athletes" className={baseStyle}>
                    <Users size={20} />
                    <span>Athletes</span>
                </Link>
            </div>
            <div className="flex flex-col gap-2 mb-5">
                <Link href="/dashboard/settings" className={baseStyle}>
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
                <hr className="my-2 border-neutral-600 border-t-2"></hr>
                <Link href="/" className="border border-opacity-0 rounded-xl transition-all flex items-center gap-2 py-2 px-4 hover:text-red-500 border-red-500 hover:border-opacity-100">
                    <LogOut size={20} />
                    <span className="">Log out</span>
                </Link>
            </div>
        </nav>
    )
}