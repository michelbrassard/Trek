import Title from "@/app/ui/dashboard/title";
import ProgressOverview from "@/app/ui/progress/overview";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Progress() {
    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <Title text="Progress" />
                <Link href={'progress/create'} >
                    <div className="flex items-center gap-2 text-blue-500">
                        <Plus size={16}/> New
                    </div>
                </Link>
            </div>
            <ProgressOverview />
        </div>
    )
}