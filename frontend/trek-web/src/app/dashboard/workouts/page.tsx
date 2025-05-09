import Title from "@/app/ui/dashboard/title";
import { Plus } from "lucide-react";
import Link from "next/link";
import WorkoutOverviewPicker from "@/app/ui/workouts/overview-picker";

export default function Workouts() {
    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <Title text="Workouts"/>
                <Link href={'workouts/create'} >
                    <div className="flex items-center gap-2 text-blue-500">
                        <Plus size={16}/> New
                    </div>
                </Link>
            </div>
            <WorkoutOverviewPicker />
        </div>
    )
}