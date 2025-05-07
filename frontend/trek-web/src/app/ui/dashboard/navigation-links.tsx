"use client"

import Link from "next/link";
import TrekLogo from "../logo/trek-logo";
import { Briefcase, CalendarCheck, ChartLine, Dumbbell, LayoutDashboard, LucideIcon, Medal, StickyNote, Users, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
    const pathname = usePathname();

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
        //TODO, skroz razdvojit stranice, tako da bude /doashboard/coach ili /.../athlete
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard, roles: ["COACH", "ATHLETE"] },
        { href: "/dashboard/workouts", label: "Workouts", icon: Dumbbell, roles: ["COACH", "ATHLETE"] },
        { href: "/dashboard/attendance", label: "Attendance", icon: CalendarCheck, roles: ["COACH", "ATHLETE"] },
        { href: "/dashboard/athletes", label: "Athletes", icon: Users, roles: ["COACH"] },
        { href: "/dashboard/progress", label: "Progress", icon: ChartLine, roles: ["ATHLETE"] },
        { href: "/dashboard/competitions", label: "Competitions", icon: Medal, roles: ["COACH", "ATHLETE"] },
        { href: "/dashboard/equipment", label: "Equipment", icon: Briefcase, roles: ["COACH", "ATHLETE"] },
        { href: "/dashboard/notes", label: "Notes", icon: StickyNote, roles: ["COACH", "ATHLETE"] },
        { href: "/dashboard/videos", label: "Videos", icon: Video, roles: ["COACH"] },
    ];

    const filteredLinks = navigationLinks.filter(link => userRole && link.roles.includes(userRole.toUpperCase()));
    return(
        <div className="flex flex-col gap-2">
            {isDesktop && 
                <div className="px-5 py-3 mb-10">
                    <div className="flex row gap-2">
                        <TrekLogo size={28} color="fill-blue-500" />
                        <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Trek</p>
                    </div>
                </div>
            }
            
            {filteredLinks.map(({ href, label, icon: Icon }) => {
                let isActive = pathname === href
                // used so that the active link indicator persits 
                // when a details page or a form from a section is opened
                if(href.startsWith("/dashboard/")) {
                    isActive = pathname.startsWith(href);
                }
                
                
                return(
                    <Link
                        key={href}
                        href={href}
                        className={`
                            ${styles} 
                            ${isActive && isDesktop ? "bg-neutral-200 dark:bg-neutral-800" : ""}
                            ${isActive && !isDesktop ? "underline" : ""}`}
                        onClick={!isDesktop ? toggleNavigation : undefined}
                    >
                        {isDesktop && <Icon size={16} />}
                        <span>{label}</span>
                    </Link>
                );
            })}
        </div>
    );
}