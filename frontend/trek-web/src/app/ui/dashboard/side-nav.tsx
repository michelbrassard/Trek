import Link from "next/link"
import { LayoutDashboard, Users, Settings, LogOut, CalendarCheck, Medal, Dumbbell, ChartLine, Briefcase, StickyNote } from "lucide-react";
import TrekLogo from "../trek-logo";

export default function SideNav() {

    const baseStyle = 'py-2 px-4 rounded-xl text-base font-medium hover:bg-neutral-200 hover:dark:bg-neutral-800 transition-colors flex items-center gap-2'

    return (
        <nav className="w-60 flex flex-col justify-between gap-8 bg-neutral-100 dark:bg-neutral-900 h-screen p-4">
            <div className="flex flex-col gap-2">
                <div className="px-4 mb-5 mt-4">
                    <TrekLogo />
                </div>
                <Link href="/dashboard" className={baseStyle}>
                    <LayoutDashboard size={16} />
                    <span>Overview</span>
                </Link>
                <Link href="/dashboard/workouts" className={baseStyle}>
                    <Dumbbell size={16} />
                    <span>Workouts</span>
                </Link>
                <Link href="/dashboard/attendance" className={baseStyle}>
                    <CalendarCheck size={16} />
                    <span>Attendance</span>
                </Link>
                <Link href="/dashboard/athletes" className={baseStyle}>
                    <Users size={16} />
                    <span>Athletes</span>
                </Link>
                <Link href="/dashboard/progress" className={baseStyle}>
                    <ChartLine size={16} />
                    <span>Progress</span>
                </Link>
                <Link href="/dashboard/competitions" className={baseStyle}>
                    <Medal size={16} />
                    <span>Competitions</span>
                </Link>
                <Link href="/dashboard/equipment" className={baseStyle}>
                    <Briefcase size={16} />
                    <span>Equipment</span>
                </Link>
                <Link href="/dashboard/notes" className={baseStyle}>
                    <StickyNote size={16} />
                    <span>Notes</span>
                </Link>
            </div>
            <div className="flex flex-col gap-2 mb-5">
                <Link href="/dashboard/settings" className={baseStyle}>
                    <Settings size={16} />
                    <span>Settings</span>
                </Link>
                <hr className="my-2 border-neutral-400 dark:border-neutral-600 border-t-2"></hr>
                <Link href="/" className="border border-opacity-0 rounded-xl transition-all flex items-center gap-2 py-2 px-4 hover:text-red-500 border-red-500 hover:border-opacity-100">
                    <LogOut size={16} />
                    <span className="">Log out</span>
                </Link>
            </div>
        </nav>
    )
}