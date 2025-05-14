import Title from "@/app/ui/dashboard/title";
import NotesOverview from "@/app/ui/notes/overview";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Notes() {
    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <Title text="Notes" />
                <Link href={'notes/create'} >
                    <div className="flex items-center gap-2 text-blue-500">
                        <Plus size={16}/> New
                    </div>
                </Link>
            </div>
            <NotesOverview />
        </div>
    )
}