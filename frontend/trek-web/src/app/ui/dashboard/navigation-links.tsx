import Link from "next/link";
import TrekLogo from "../trek-logo";
import { Briefcase, CalendarCheck, ChartLine, Dumbbell, LayoutDashboard, Medal, Settings, StickyNote, Users } from "lucide-react";
import LogOutButton from "./logout-button";

interface DashboardNavigationLinksProps {
    styles: string,
    isDesktop: boolean,
    toggleNavigation?: () => void
}

export default function DashboardNavigationLinks({styles, isDesktop, toggleNavigation}: DashboardNavigationLinksProps) {
    return(
        <div className="flex flex-col gap-2">
            {isDesktop && 
                <div className="px-4 mb-5 mt-4">
                    <TrekLogo />
                </div>
            }
            
            {[
                { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
                { href: "/dashboard/workouts", label: "Workouts", icon: Dumbbell },
                { href: "/dashboard/attendance", label: "Attendance", icon: CalendarCheck },
                { href: "/dashboard/athletes", label: "Athletes", icon: Users },
                { href: "/dashboard/progress", label: "Progress", icon: ChartLine },
                { href: "/dashboard/competitions", label: "Competitions", icon: Medal },
                { href: "/dashboard/equipment", label: "Equipment", icon: Briefcase },
                { href: "/dashboard/notes", label: "Notes", icon: StickyNote },
            ].map(({ href, label, icon: Icon }) => (
                <Link
                    key={href}
                    href={href}
                    className={styles}
                    onClick={!isDesktop ? toggleNavigation : undefined}
                >
                    {isDesktop && <Icon size={16} />}
                    <span>{label}</span>
                </Link>
            ))}

            <div className="flex flex-col gap-2 mb-5">
                <Link href="/dashboard/settings" className={styles} onClick={toggleNavigation}>
                    {isDesktop && <Settings size={16} />}
                    <span>Settings</span>
                </Link>
                <hr className="my-2 border-neutral-400 dark:border-neutral-600 border-t-2"></hr>
                <LogOutButton isDesktop={isDesktop} />
            </div>
        </div>
    );
}