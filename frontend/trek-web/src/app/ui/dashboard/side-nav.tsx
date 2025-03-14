"use client"

import DashboardNavigationLinks from "./navigation-links";

export default function SideNav() {

    const baseStyle = 'py-2 px-4 rounded-xl text-base font-medium hover:bg-neutral-200 hover:dark:bg-neutral-800 transition-colors flex items-center gap-2'

    return (
        <nav className="w-60 flex flex-col justify-between gap-8 bg-neutral-100 dark:bg-neutral-900 h-screen p-4">
            <DashboardNavigationLinks styles={baseStyle} isDesktop={true} />
        </nav>
    )
}