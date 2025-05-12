import Title from "@/app/ui/dashboard/title";
import ProgressOverview from "@/app/ui/progress/overview";
import { Plus, History } from "lucide-react";
import Link from "next/link";

export default function Progress() {
    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <Title text="Progress" />
                <div className="flex flex-row gap-2">
                    <Link href={'progress/create'} >
                        <div className="flex items-center gap-2 text-blue-500">
                            <Plus size={16}/> New
                        </div>
                    </Link>
                    <Link href={'progress/versions'} >
                        <div className="flex items-center gap-2 text-blue-500">
                            <History size={16}/> Versions
                        </div>
                    </Link>
                </div>
            </div>
            <ProgressOverview />
        </div>
    )
}