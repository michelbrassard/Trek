import WorkoutOverviewList from "@/app/ui/workouts/workout-overview-list";
import Title from "@/app/ui/dashboard/title";
import { Plus } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";

export default function Workouts() {
    return (
        <div>
            <Breadcrumbs />
            <Title text="Workouts"/>
            <Link href={'workouts/create'} >
                <div className="flex items-center gap-2 text-blue-500">
                    <Plus size={16}/> New
                </div>
            </Link>
            <WorkoutOverviewList />
        </div>
    )
}