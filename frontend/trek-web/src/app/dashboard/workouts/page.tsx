import Title from "@/app/ui/dashboard/title";
import { Plus, TestTubeDiagonal } from "lucide-react";
import Link from "next/link";
import WorkoutOverviewPicker from "@/app/ui/workouts/overview-picker";

export default function Workouts() {
    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <Title text="Workouts"/>
                <div className="flex flex-row gap-4">
                    <Link href={'workouts/create'} >
                        <div className="flex items-center gap-2 text-blue-500">
                            <Plus size={16}/> New
                        </div>
                    </Link>
                    <Link href={'workouts/experiment'} >
                        <div className="flex items-center gap-2 text-yellow-500">
                            <TestTubeDiagonal size={16}/> Experiment
                        </div>
                    </Link>
                </div>
                
            </div>
            <WorkoutOverviewPicker />
        </div>
    )
}