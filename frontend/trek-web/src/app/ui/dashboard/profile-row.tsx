'use client'

import { CircleUserRound } from "lucide-react"
import Link from "next/link"
import SearchComponent from "./search/search"

export default function ProfileRow() {
    return(
        <div className="py-2 px-4 flex flex-row justify-end gap-1 items-center">
            <SearchComponent />
            <Link href="/dashboard/profile" className="flex flex-row items-center gap-2 hover:bg-neutral-100 hover:dark:bg-neutral-900 transition-all p-2 rounded-xl">
                <CircleUserRound size={20}/>
                Account
            </Link>
        </div>
    )
}