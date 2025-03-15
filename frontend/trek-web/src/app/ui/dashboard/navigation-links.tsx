"use client"

import Link from "next/link";
import TrekLogo from "../trek-logo";
import { Briefcase, CalendarCheck, ChartLine, Dumbbell, LayoutDashboard, LucideIcon, Medal, Settings, StickyNote, Users, Video } from "lucide-react";
import LogOutButton from "./logout-button";
import { useEffect, useState } from "react";

interface DashboardNavigationLinksProps {
    styles: string,
    isDesktop: boolean,
    toggleNavigation?: () => void
}

interface NavigationLink {
    href: string;
    label: string;
    icon: LucideIcon;
    roles: string[];
}

export default function DashboardNavigationLinks({styles, isDesktop, toggleNavigation}: DashboardNavigationLinksProps) {
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserRole = async () => {
          try {
            const response = await fetch("/api/proxy/role", { 
              method: "GET",
              credentials: "include",
            });
    
            if (!response.ok) throw new Error("Failed to fetch user role");
    
            const data = await response.json();
            setUserRole(data.role);
          } catch (error) {
            console.error("Error fetching user role:", error);
          }
        };
    
        fetchUserRole();
      }, [userRole]);

    const navigationLinks: NavigationLink[] = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard, roles: ["COACH", "ATHLETE"] },
        { href: "/dashboard/workouts", label: "Workouts", icon: Dumbbell, roles: ["COACH", "ATHLETE"] },
        { href: "/dashboard/attendance", label: "Attendance", icon: CalendarCheck, roles: ["COACH", "ATHLETE"] },
        { href: "/dashboard/athletes", label: "Athletes", icon: Users, roles: ["COACH"] },
        { href: "/dashboard/progress", label: "Progress", icon: ChartLine, roles: ["COACH", "ATHLETE"] },
        { href: "/dashboard/competitions", label: "Competitions", icon: Medal, roles: ["COACH", "ATHLETE"] },
        { href: "/dashboard/equipment", label: "Equipment", icon: Briefcase, roles: ["COACH", "ATHLETE"] },
        { href: "/dashboard/notes", label: "Notes", icon: StickyNote, roles: ["COACH", "ATHLETE"] },
        { href: "/dashboard/videos", label: "Videos", icon: Video, roles: ["COACH"] },
    ];

    const filteredLinks = navigationLinks.filter(link => userRole && link.roles.includes(userRole.toUpperCase()));

    return(
        <div className="flex flex-col gap-2">
            {isDesktop && 
                <div className="px-4 mb-5 mt-4">
                    <TrekLogo />
                </div>
            }
            
            {filteredLinks.map(({ href, label, icon: Icon }) => (
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