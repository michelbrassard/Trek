"use client"

import { X, AlignLeft } from "lucide-react";
import { useState } from "react";
import DashboardNavigationLinks from "./navigation-links";

export default function MobileDashboardNavigation() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const mobileLinkStyle = "text-3xl font-medium hover:underline pb-5"

    return(
        <nav className="m-3">
            <div className="md:hidden flex flex-row justify-between">
                <button onClick={toggleMenu}>
                    <div className="inline-block text-neutral-400 dark:text-neutral-600 hover:dark:bg-neutral-900 hover:bg-neutral-100 hover:dark:text-neutral-100 hover:text-neutral-800 transition-colors px-3 py-2.5 rounded-xl">
                        <AlignLeft size={30}/>
                    </div>
                </button>
            </div>
            <div className={`md:hidden backdrop-blur-md p-5 fixed inset-0 bg-neutral-200 dark:bg-neutral-800 bg-opacity-80 z-50 transition-all transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col justify-between">
                    <div className="mb-10">
                        <button onClick={toggleMenu} className="float-left p-2">
                            <X size={35}/>
                        </button>
                    </div>
                    <div className="flex flex-col gap-10 py-5 px-10">
                        <DashboardNavigationLinks styles={mobileLinkStyle} isDesktop={false} toggleNavigation={toggleMenu} />
                    </div>
                </div>
            </div>
        </nav>
    )
}