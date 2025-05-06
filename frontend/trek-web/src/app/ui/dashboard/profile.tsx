'use client'

import { CircleUserRound } from "lucide-react"
import Link from "next/link"

export default function ProfileRow() {
    return(
        <div className="py-2 px-4 flex flex-row justify-end gap-5 items-center">
            <div>Search</div>
            <Link href="/dashboard/profile" className="flex flex-row items-center gap-2 hover:bg-neutral-100 hover:dark:bg-neutral-900 transition-all p-2 rounded-xl">
                <CircleUserRound size={20}/>
                Profile
            </Link>
        </div>
    )
}