import CompetitionOverviewList from "@/app/ui/competitions/competition-overview-list";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import Title from "@/app/ui/dashboard/title";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function CompetitionsPage() {
    return (
        <div>
            <Breadcrumbs />
            <Title text="Competitions"/>
            <Link href={'competitions/create'} >
                <div className="flex items-center gap-2 text-blue-500">
                    <Plus size={16}/> New
                </div>
            </Link>
            <p>Bulk import from image or file + a list and details for a competition</p>
            <p>Different views...</p>
            <CompetitionOverviewList />
        </div>
    )
}